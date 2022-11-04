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

function App() {
  authService.login('testy69', 'password123');
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Home />}></Route>
          <Route path='/posts' element={<AllPosts />}></Route>
          <Route path='/posts/:id' element={<OnePost />}></Route>
          <Route path='/posts/new' element={<NewPost />}></Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
