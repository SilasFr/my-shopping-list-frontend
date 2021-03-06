import AddIcon from '@mui/icons-material/Add';
import { Box, Container, Fab, Paper, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAlert from '../hooks/useAlert';
import useAuth from '../hooks/useAuth';
import api from '../services/api';

export default function Feed() {
  const [isTemplate, setIsTemplate] = useState(false);
  const { token, userData, setUserData, lists, setLists } = useAuth();
  const { setMessage } = useAlert();
  const navigate = useNavigate();

  useEffect(() => {
    if (token !== null) {
      api
        .validateToken(token)
        .then((response) => {
          setUserData(response.data);
          navigate('/home');
        })
        .catch((error) => {
          setMessage({ type: 'error', text: error.response.data.message });
        });
    }
  }, []);

  useEffect(() => {
    async function loadLists() {
      try {
        const response = await api.getLists(token);

        if (!response.data || response.data.length === 0) {
          const { data: template } = await api.getTemplate(token);
          setIsTemplate(true);
          setLists([template]);
        } else {
          setLists([...response.data]);
        }
      } catch (e) {
        console.log(e);
      }
    }
    loadLists();
  }, [token]);

  if (!userData) {
    return <Typography>Carregando</Typography>;
  }
  return (
    <Container sx={{ width: '100%', height: '87vh' }}>
      <Typography variant="h5" sx={{ margin: '20px 0 15px 0' }}>
        <strong>Welcome, {userData.name}</strong>
      </Typography>
      <Box sx={styles.container}>
        <Stack spacing={2}>
          {lists.map((element) => {
            return (
              <Link to={`/home/list/${element._id}`} key={element._id}>
                <Paper key={element._id} elevation={16} sx={styles.item}>
                  {isTemplate ? 'Template' : `${element.frequency} list`}
                </Paper>
              </Link>
            );
          })}
        </Stack>
      </Box>
      <Box sx={styles.fabStyle}>
        <Fab
          size="medium"
          aria-label="add"
          color="primary"
          onClick={() => {
            navigate('/home/list/create');
          }}
        >
          <AddIcon color="default" />
        </Fab>
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
  fabStyle: {
    position: 'absolute',
    bottom: '0',
    right: '10px',
  },
};
