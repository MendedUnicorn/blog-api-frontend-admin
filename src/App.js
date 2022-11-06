import './App.css';
import OnePost from './pages/OnePost';
import AllPosts from './pages/AllPosts';
import Layout from './components/Layout';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes,
} from 'react-router-dom';
import { Home } from './pages/Home';
import authService from './services/auth.service';
import NewPost from './pages/NewPost';
import { Login } from './pages/Login';
import { useState } from 'react';

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(authService.getCurrentUser);

  const handleLogout = () => setUserLoggedIn(false);
  const handleLogin = () => setUserLoggedIn(true);

  const user = localStorage.getItem('user');
  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={
            <Layout handleLogout={handleLogout} userLoggedIn={userLoggedIn} />
          }
        >
          <Route path='/' element={<Home />}></Route>
          <Route path='/posts' element={<AllPosts />}></Route>
          <Route path='/posts/:id' element={<OnePost />}></Route>
          <Route path='/posts/new' element={<NewPost />}></Route>
          <Route
            path='/login'
            element={<Login handleLogin={handleLogin} />}
          ></Route>
          {/* <Route path='/posts/:id/comments/:commentid' /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
