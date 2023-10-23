import Container from 'react-bootstrap/Container';
import ApiProvider from './contexts/ApiProvider';
import Header from './components/Header';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import PublicRoute from './components/PublicRoute';
import PrivateRoute from './components/PrivateRoute';
import FeedPage from './pages/FeedPage';
import UserPage from './pages/UserPage';
import ExplorePage from './pages/ExplorePage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import FlashProvider from './contexts/FlashProvider';
import UserProvider from './contexts/UserProvider';

export default function App(){

  return (
    <Container fluid className="App">
        <BrowserRouter>
          <FlashProvider>
            <ApiProvider>
              <UserProvider>
                <Header />
                <Routes>
                  <Route path="/login" element={
                    <PublicRoute><LoginPage /></PublicRoute>
                  } />
                  <Route path="/register" element={
                    <PublicRoute><RegistrationPage /></PublicRoute>
                  } />
                  <Route path="*" element={
                    <PrivateRoute>
                      <Routes>
                        <Route path="/" element={<FeedPage />} />
                        <Route path="/explore" element={<ExplorePage />} />
                        <Route path="/user/:username" element={<UserPage />} />
                        <Route path="*" element={<Navigate to="/" />} />
                      </Routes>
                    </PrivateRoute>
                  } />
                </Routes>
              </UserProvider>
            </ApiProvider>
          </FlashProvider>
        </BrowserRouter>
      </Container>
  );
}
