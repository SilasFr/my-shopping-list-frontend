import {
  Button,
  Checkbox,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
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
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import api from '../services/api';

export default function RenderList() {
  const { id } = useParams();
  const { lists, token } = useAuth();
  const [list, setList] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  function handleOpen() {
    setOpenDialog(true);
  }

  function handleClose() {
    setOpenDialog(false);
  }

  async function handleDelete() {
    try {
      await api.deleteList(token, id);
      navigate('/home');
    } catch (e) {
      console.log(e);
    }

    setOpenDialog(false);
  }

  useEffect(() => {
    setList(lists.find((list) => list._id === id));
  }, [id, lists]);

  if (!list) {
    return (
      <Box
        sx={{
          width: '100%',
          height: '100vh',
          mt: 10,
          display: 'flex',
          alignItems: 'start',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h4">Carregando...</Typography>
      </Box>
    );
  }
  return (
    <Container sx={{ position: 'relative', height: '100vh' }}>
      <List>
        {list.items.map((item) => {
          const labelId = `checkbox-list-label-${item.product}`;
          return (
            <ListItem
              key={labelId}
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
      <Fab
        sx={{
          position: 'fixed',
          right: '10px',
          bottom: '10px',
        }}
        size="small"
        aria-label="add"
        color="error"
        onClick={handleOpen}
        onMouseDown={handleOpen}
      >
        <DeleteOutlineOutlinedIcon />
      </Fab>
      <AlertDialog
        open={openDialog}
        handleClose={handleClose}
        handleDelete={handleDelete}
      />
    </Container>
  );
}

const AlertDialog = ({ open, handleClose, handleDelete }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Delete list</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want do delete this lists?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDelete} autoFocus>
          Yes
        </Button>
        <Button onClick={handleClose} autoFocus>
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
};

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
