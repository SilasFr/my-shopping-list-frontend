import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { SignpostOutlined } from '@mui/icons-material';
import { Box } from '@mui/system';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';

import DialogTitle from '@mui/material/DialogTitle';
import styled from 'styled-components';
import Logo from '../assets/logo.png';
import useAuth from '../hooks/useAuth';
import { useState } from 'react';

export default function Home() {
  const navigate = useNavigate();
  const { token, logout } = useAuth();

  const [openDialog, setOpenDialog] = useState(false);

  const handleClose = () => {
    setOpenDialog(false);
  };

  if (!token) {
    return <Navigate to={'/'} replace />;
  }

  function confirmLogout() {
    setOpenDialog(true);
  }

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <Box sx={styles.container}>
      <Box sx={styles.secondaryContainer}>
        <ArrowBackIosNewRoundedIcon
          sx={{ cursor: 'pointer' }}
          onClick={() => navigate(-1)}
        />

        <LogoImg src={Logo} alt="shopping-cart" />
        <SignpostOutlined sx={{ cursor: 'pointer' }} onClick={confirmLogout} />
        <AlertDialog
          open={openDialog}
          handleClose={handleClose}
          handleLogout={handleLogout}
        />
      </Box>
      <Outlet />
    </Box>
  );
}

const LogoImg = styled.img`
  width: 50px;
  align-self: center;
`;

const AlertDialog = ({ open, handleClose, handleLogout }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{'Logout'}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to logout?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleLogout}>Yes</Button>
        <Button onClick={handleClose} autoFocus>
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: '15px 20px 0 20px',
    maxHeight: '80px',
  },
  secondaryContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    margin: '0 0 50px 10px',
  },
};
