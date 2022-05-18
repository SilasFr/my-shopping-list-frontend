import {
  Checkbox,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import NumbersIcon from '@mui/icons-material/Numbers';
import ModeEditOutlineTwoToneIcon from '@mui/icons-material/ModeEditOutlineTwoTone';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';

export default function RenderList() {
  const { id } = useParams();
  const { lists } = useAuth();
  const [list, setList] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    setList(lists.find((list) => list._id === id));
  }, []);

  if (!list) {
    return (
      <Box>
        {' '}
        <Typography>Carregando</Typography>{' '}
      </Box>
    );
  }

  return (
    <Container>
      <Box onClick={() => navigate(-1)}>
        <ArrowBackIosNewRoundedIcon sx={{ cursor: 'pointer' }} />
      </Box>
      <List>
        {list.list.map((item) => {
          const labelId = `checkbox-list-label-${item.product}`;
          return (
            <ListItem
              ket={labelId}
              disablePadding
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="price"
                  sx={styles.inputContainer}
                >
                  <ModeEditOutlineTwoToneIcon />
                </IconButton>
              }
            >
              <ListItemButton role={undefined} dense>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>

                <ListItemText id={labelId} primary={item.product} />
                <ListItemIcon sx={styles.inputContainer}>
                  <Box sx={styles.input}>
                    <NumbersIcon sx={styles.inputIcon} />
                    <Typography>{item.qty}</Typography>
                  </Box>
                  <Box sx={styles.input}>
                    <PriceChangeIcon sx={styles.inputIcon} />
                    <Typography>{item.price}</Typography>
                  </Box>
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Container>
  );
}

const styles = {
  inputContainer: {
    display: 'flex',
    gap: '8px',
  },
  input: {
    display: 'flex',
    alignItems: 'center',
    gap: '2px',
    border: '1px solid',
    borderRadius: '5px',
    padding: '1px 4px',
  },
  inputIcon: { fontSize: '85%', margin: 'auto 0' },
};
