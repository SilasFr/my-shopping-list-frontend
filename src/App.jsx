import { CssBaseline } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Alert from './components/alert';
import Home from './components/home';
import ToggleColorMode from './components/themeComponent';
import { AlertProvider } from './contexts/alertContext';
import UserProvider from './contexts/userContext';
import Feed from './pages/feed';
import SignIn from './pages/signin';
import SignUp from './pages/signup';

function App() {
  return (
    <ToggleColorMode>
      <CssBaseline />
      <UserProvider>
        <AlertProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/" element={<SignIn />} />
              <Route path="home" element={<Home />}>
                <Route path="/home/feed" element={<Feed />} />
              </Route>
            </Routes>
          </BrowserRouter>
          <Alert />
        </AlertProvider>
      </UserProvider>
    </ToggleColorMode>
  );
}

export default App;
