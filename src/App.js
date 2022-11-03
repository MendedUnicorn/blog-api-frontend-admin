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

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Home />}></Route>
          <Route path='/posts' element={<AllPosts />}></Route>
          <Route path='/posts/:id' element={<OnePost />}></Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
