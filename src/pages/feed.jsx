import { Box, Container, Paper, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import api from '../services/api';
import RenderList from './renderList';

export default function Feed() {
  const [isTemplate, setIsTemplate] = useState(false);
  const [lists, setLists] = useState([]);
  const { token, userData, setUserData } = useAuth();

  useEffect(() => {
    async function loadLists() {
      try {
        const response = await api.getLists(token);
        if (!response.data || response.data.length === 0) {
          const { data: template } = await api.getTemplate(token);
          setIsTemplate(true);
          setUserData({ ...userData, lists: [template] });
          setLists([template]);
        } else {
          setLists([...response.data]);
          setUserData({ ...userData, lists: [response.data] });
        }
      } catch (e) {
        console.log(e);
      }
    }
    loadLists();
  }, [token]);
  return (
    <Container sx={{ width: '100%', border: '1px solid red' }}>
      <Typography sx={{ margin: '0 0 5px 0' }}>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit.
      </Typography>
      <Box sx={styles.container}>
        <Stack spacing={2}>
          {lists.map((element) => {
            console.log(element);
            return (
              <Link to={`/home/list/${element._id}`} key={element._id}>
                <Paper key={element._id} sx={styles.item}>
                  {isTemplate ? 'Template' : 'List'}
                </Paper>
              </Link>
            );
          })}
        </Stack>
      </Box>
    </Container>
  );
}

const styles = {
  container: {
    width: '100%',
  },
  item: {
    textAlign: 'center',
    cursor: 'pointer',

    width: '100%',
    minHeight: '50px',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};
