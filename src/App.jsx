import { CssBaseline } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Alert from './components/alert';
import ToggleColorMode from './components/themeComponent';
import { AlertProvider } from './contexts/alertContext';
import SignIn from './pages/signin';
import SignUp from './pages/signup';

function App() {
  return (
    <ToggleColorMode>
      <CssBaseline />
      <AlertProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/" element={<SignIn />} />
          </Routes>
        </BrowserRouter>
        <Alert />
      </AlertProvider>
    </ToggleColorMode>
  );
}

export default App;
