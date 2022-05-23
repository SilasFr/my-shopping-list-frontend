import { AddCircleOutlined } from '@mui/icons-material';

import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import generateId from '../services/keyGen';
import inputMask from '../components/inputMasks';
import api from '../services/api';
import useAuth from '../hooks/useAuth';

export default function CreateList() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [listFrequency, setListFrequency] = useState('');

  const [list, setList] = useState([]);
  const [item, setItem] = useState({
    product: '',
    price: '',
    qty: '',
    category: 'groceries',
  });

  useEffect(() => {
    setItem({
      product: '',
      price: '',
      qty: '',
      category: 'groceries',
    });
  }, [list]);

  function handleClose() {
    setOpenDialog(false);
  }

  async function handleSave() {
    try {
      await api.createList(token, {
        items: list,
        frequency: listFrequency,
      });
      setOpenDialog(false);
    } catch (e) {
      console.log(e);
    }
  }

  function handleChange(e) {
    setItem({ ...item, [e.target.name]: e.target.value });
  }

  function handleAddItemToList() {
    const { product, price, qty } = item;
    if (product === '' || !price || !qty) {
      return;
    }
    setList([...list, item]);
  }

  function handleCreateList() {
    setOpenDialog(true);
  }

  function keyGen() {
    return generateId();
  }
  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          position: 'relative',
        }}
        onClick={() => navigate(-1)}
      >
        <Typography variant="h6" sx={{ margin: '0 0 15px 0' }}>
          Create your own list
        </Typography>
        <Button
          sx={styles.submitButton}
          variant="contained"
          disabled={list.length < 1}
          onClick={handleCreateList}
          onMouseDown={handleCreateList}
        >
          create
        </Button>
      </Box>
      <Box>
        <Stack spacing={1}>
          <Box sx={styles.inputContainer}>
            <TextField
              sx={styles.textInput}
              name="product"
              label="product name"
              onChange={handleChange}
              value={item.product}
              variant="standard"
              type="text"
              required
            ></TextField>
            <TextField
              sx={styles.priceInput}
              InputProps={{
                inputProps: {
                  min: 1,
                  type: 'number',
                  onKeyUp: (e) => {
                    return inputMask.currency(e);
                  },
                },
                prefix: '$',
              }}
              name="price"
              label="price"
              onChange={handleChange}
              value={item.price}
              variant="standard"
              type="number"
              required
            ></TextField>
            <TextField
              sx={styles.numberInput}
              InputProps={{
                inputProps: { min: 1 },
              }}
              name="qty"
              label="qty"
              onChange={handleChange}
              value={item.qty}
              variant="standard"
              type="number"
              required
            ></TextField>
            <AddCircleOutlined
              fontSize="large"
              sx={styles.addIcon}
              onClick={handleAddItemToList}
            />
          </Box>
          {list.map((item) => (
            <Paper
              key={keyGen()}
              sx={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <Typography sx={{ width: '60%' }}>{item.product}</Typography>
              <Typography>{item.price}</Typography>
              <Typography>{item.qty}</Typography>
            </Paper>
          ))}
        </Stack>
        <AlertDialog
          open={openDialog}
          handleClose={handleClose}
          list={list}
          frequency={listFrequency}
          setFrequency={setListFrequency}
          handleSave={handleSave}
        />
      </Box>
    </Container>
  );
}

const AlertDialog = ({
  open,
  handleClose,
  frequency,
  setFrequency,
  handleSave,
}) => {
  function handleChange(e) {
    setFrequency(e.target.value);
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Frequency</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          How often will you buy these items?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Box sx={{ width: '100%' }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Frequency</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={frequency}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value={'weekly'}>weekly</MenuItem>
              <MenuItem value={'monthly'}>monthly</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Button onClick={handleSave} autoFocus>
          Save
        </Button>
        <Button onClick={handleClose} autoFocus>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const styles = {
  inputContainer: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: '0 0 15px 0',
  },
  textInput: {
    width: '55%',
  },
  numberInput: {
    width: '15%',
  },
  priceInput: {
    width: '25%',
  },
  submitButton: {
    width: '40px',
    position: 'absolute',
    right: '-30px',
  },
  addIcon: {
    position: 'absolute',
    top: '35%',
    right: '-50px',
    cursor: 'pointer',
  },
};
