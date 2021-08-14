import GlobalStyle from './GlobalStyle';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import EditProfilePage from './pages/EditProfilePage';
import HomePage from './pages/HomePage';
import SocketProvider from './context/socket';
import ChatPage from './pages/ChatPage';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path='/login' exact component={LoginPage} />
        <Route path='/signup' exact component={SignupPage} />
       <SocketProvider>
        <Route path='/' exact component={HomePage} />
        <Route path='/chat' exact component={ChatPage} />
        <Route path='/profile' exact component={ProfilePage} />
        <Route path='/profile/edit' exact component={EditProfilePage} />
       </SocketProvider>
      </Switch>
      <GlobalStyle />
    </Router>
  );
};

export default App;
