import { Outlet, Link } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <nav className='navbar'>
        <h1>My Blog</h1>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/posts'>post</Link>
          </li>
          <li>
            <Link to='/posts/:id'>comment</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
};

export default Layout;
