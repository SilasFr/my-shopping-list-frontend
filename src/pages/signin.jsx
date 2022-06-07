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
import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import PasswordInput from '../components/formComponents';
import useAlert from '../hooks/useAlert';
import useAuth from '../hooks/useAuth';
import api from '../services/api';
import styled from 'styled-components';
import Google from '../assets/icons/google.png';
import Facebook from '../assets/icons/facebook.png';
import Github from '../assets/icons/github.png';

export default function SignIn() {
  const { setMessage } = useAlert();
  const { login, logout, token, setUserData } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  useEffect(() => {
    async function getUser() {}
    getUser();
  }, []);

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
          logout();
        });
    }
  }, []);

  const googleOAuth = () => {
    window.open('http://localhost:5000/auth/google', '_self');
  };

  function handleInputChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data: response } = await api.signIn(formData);
      login(response);
      navigate('home');
    } catch (e) {
      setMessage({ type: 'error', text: 'erro' });
      setIsLoading(false);
    }
  }

  return (
    <Container
      sx={{
        margin: '0 auto',
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
          <Typography sx={{ mt: 5 }}>OR</Typography>
          <Divider />
          <Box sx={{ display: 'none', flexDirection: 'column', gap: '5px' }}>
            <GoogleButton
              color="error"
              variant="contained"
              onClick={googleOAuth}
            >
              <img src={Google} href="#" alt="Sign up with google" />
              <Typography>Google</Typography>
            </GoogleButton>

            <FacebookButton
              color="info"
              variant="contained"
              onClick={() => alert('Em breve!')}
            >
              <img src={Facebook} href="#" alt="Sign up with facebook" />
              <Typography>Facebook</Typography>
            </FacebookButton>

            <GithubButton
              color="secondary"
              variant="contained"
              onClick={() => alert('Em breve!')}
            >
              <img src={Github} href="#" alt="Sign up with github" />
              <Typography>GitHub</Typography>
            </GithubButton>
          </Box>

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
    margin: '60px 0 20px 0',
  },
  input: {
    marginBottom: '18px',
  },
  actionsContainer: {},
};

const GoogleButton = styled(Button)`
  display: flex;
  justify-content: center;
  gap: 5px;
  background-color: red;
  text-transform: none;
`;

const FacebookButton = styled(Button)`
  display: flex;
  justify-content: center;
  gap: 5px;
  background-color: blue;
  text-transform: none;
`;

const GithubButton = styled(Button)`
  display: flex;
  justify-content: center;
  gap: 5px;
  background-color: #572557;
  text-transform: none;
`;
