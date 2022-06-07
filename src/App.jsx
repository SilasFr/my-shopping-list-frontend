import { CssBaseline } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Alert from './components/alert';
import ToggleColorMode from './components/themeComponent';
import MenuAppBar from './components/topBar';
import { AlertProvider } from './contexts/alertContext';
import UserProvider from './contexts/userContext';
import CreateList from './pages/createList';
import Feed from './pages/feed';
import RenderList from './pages/renderList';
import SignIn from './pages/signin';
import SignUp from './pages/signup';

function App() {
  return (
    <UserProvider>
      <ToggleColorMode>
        <CssBaseline />
        <AlertProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/" element={<SignIn />} />
              <Route path="home" element={<MenuAppBar />}>
                <Route path="/home/" element={<Feed />} />
                <Route path="/home/list/:id" element={<RenderList />} />
                <Route path="/home/list/create" element={<CreateList />} />
              </Route>
            </Routes>
          </BrowserRouter>
          <Alert />
        </AlertProvider>
      </ToggleColorMode>
    </UserProvider>
  );
}

export default App;
