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
import { Link as RouterLink } from 'react-router-dom';
import PasswordInput from '../components/formComponents';

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  function handleInputChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
  }

  return (
    <Container
      sx={{
        margin: '60px auto 0 auto',
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

        <Typography>Sign In</Typography>
      </Box>

      <Box sx={styles.container}>
        <FormControl variant="outlined">
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
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            sign in
          </Button>
          <Link component={RouterLink} to="/sign-up" sx={{ marginTop: '20px' }}>
            <Typography>Create a new account</Typography>
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
    marginBottom: '20px',
  },
  input: {
    marginBottom: '18px',
  },
  actionsContainer: {},
};
