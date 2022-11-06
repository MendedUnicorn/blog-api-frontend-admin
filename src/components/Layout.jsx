import { useEffect, useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import authService from '../services/auth.service';

const Layout = ({ handleLogout, userLoggedIn }) => {
  // useEffect(() => {
  //   if (authService.getCurrentUser()) setUserLoggedIn(true);
  //   else setUserLoggedIn(false);
  // }, [userLoggedIn]);

  const handleClick = () => {
    authService.logout();
    handleLogout();
  };

  return (
    <>
      <nav className='navbar'>
        <h1>My Blog</h1>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/posts'>Post</Link>
          </li>
          {userLoggedIn && (
            <li>
              <Link to='/posts/new'>New Post</Link>
            </li>
          )}
          <li>
            {userLoggedIn ? (
              <Link onClick={handleClick} to='/login'>
                Log Out
              </Link>
            ) : (
              <Link to='/login'>Log In</Link>
            )}
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
};

export default Layout;
