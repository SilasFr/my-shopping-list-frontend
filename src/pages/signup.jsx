import {
  Button,
  Container,
  Divider,
  FormControl,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import PasswordInput from '../components/formComponents';
import useAlert from '../hooks/useAlert';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function SignUp() {
  const { setMessage } = useAlert();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });

  function handleInputChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    if (formData.password !== formData.passwordConfirmation) {
      setMessage({ type: 'success', text: "Passwords don't match" });
    }

    try {
      const { name, email, password } = formData;
      await api.signUp({ name, email, password });

      setIsLoading(false);
      setMessage({ type: 'success', text: 'Success!' });
      navigate('/');
    } catch (e) {
      setIsLoading(false);
      console.error(e);
      setMessage({ type: 'error', text: 'erro' });
    }
  }
  return (
    <Container
      sx={{
        margin: '0 auto ',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Box sx={styles.title}>
        <Typography sx={{ fontSize: '30px' }}>My Shopping List</Typography>

        <Divider />

        <Typography>Sign Up</Typography>
      </Box>

      <Box sx={styles.container}>
        <FormControl variant="outlined">
          <TextField
            sx={styles.input}
            variant="outlined"
            type="text"
            label="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          ></TextField>

          <TextField
            sx={styles.input}
            variant="outlined"
            type="email"
            label="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          ></TextField>

          <PasswordInput
            name="password"
            sx={styles.input}
            label="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />

          <PasswordInput
            name="passwordConfirmation"
            sx={styles.input}
            label="password confirmation"
            value={formData.passwordConfirmation}
            onChange={handleInputChange}
            required
          />
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            sign up
          </Button>
          <Link component={RouterLink} to="/" sx={{ marginTop: '20px' }}>
            <Typography>I already have an account</Typography>
          </Link>
        </FormControl>
      </Box>
    </Container>
  );
}

const styles = {
  container: {
    maxWidth: '450px',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
  },
  title: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    gap: '10px',
    margin: '60px 0 20px 0',
  },
  input: {
    marginBottom: '18px',
  },
  actionsContainer: {},
};
