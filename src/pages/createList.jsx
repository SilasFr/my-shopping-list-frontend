import { AddCircleOutlined } from '@mui/icons-material';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';

import {
  Box,
  Container,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateList() {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [item, setItem] = useState({
    product: '',
    price: undefined,
    qty: undefined,
    category: 'groceries',
  });

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
  return (
    <Container>
      <Box
        sx={{ display: 'flex', justifyContent: 'space-between' }}
        onClick={() => navigate(-1)}
      >
        <Typography variant="h5" sx={{ margin: '0 0 15px 0' }}>
          Create your own list
        </Typography>
      </Box>
      <Box>
        <Stack>
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
              sx={styles.numberInput}
              InputProps={{ inputProps: { min: 1, type: 'number' } }}
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
            <Paper sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography sx={{ width: '60%' }}>{item.product}</Typography>
              <Typography>{item.price}</Typography>
              <Typography>{item.qty}</Typography>
            </Paper>
          ))}
        </Stack>
      </Box>
    </Container>
  );
}

const styles = {
  inputContainer: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textInput: {
    width: '60%',
  },
  numberInput: {
    width: '15%',
  },
  addIcon: {
    position: 'absolute',
    top: '35%',
    right: '-50px',
    cursor: 'pointer',
  },
};
