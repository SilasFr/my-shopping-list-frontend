import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { SignpostOutlined } from '@mui/icons-material';
import { Box } from '@mui/system';
import Logo from '../assets/logo.png';
import useAuth from '../hooks/useAuth';

export default function Home({ children }) {
  const navigate = useNavigate();
  const { token, logout } = useAuth();

  if (!token) {
    return <Navigate to={'/'} replace />;
  }

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        border: '5px solid red',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '50px',
        }}
      >
        <img src={Logo} alt="shopping-cart" />
        <SignpostOutlined sx={{ cursor: 'pointer' }} onClick={handleLogout} />
      </Box>
      <Outlet />
      {children}
    </Box>
  );
}
