import * as React from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { ThemeToggler } from './themeComponent';
import useAuth from '../hooks/useAuth';
import {
  Button,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  AppBar,
} from '@mui/material';
import { SignpostOutlined, ArrowBackIosNewRounded } from '@mui/icons-material';
import styled from 'styled-components';
import Logo from '../assets/logo.png';

export default function MenuAppBar() {
  const navigate = useNavigate();
  const { token, logout } = useAuth();
  const [openDialog, setOpenDialog] = React.useState(false);

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
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => navigate(-1)}
          >
            <ArrowBackIosNewRounded sx={{ cursor: 'pointer' }} />
          </IconButton>
          <LogoImg src={Logo} alt="shopping-cart" />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My Shopping List
          </Typography>
          <ThemeToggler />
          <SignpostOutlined
            sx={{ cursor: 'pointer' }}
            onClick={confirmLogout}
          />
        </Toolbar>
      </AppBar>
      <AlertDialog
        open={openDialog}
        handleClose={handleClose}
        handleLogout={handleLogout}
      />
      <Outlet />
    </Box>
  );
}
const LogoImg = styled.img`
  width: 35px;
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
