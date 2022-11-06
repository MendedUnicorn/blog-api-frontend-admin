import { useState } from 'react';
import authService from '../services/auth.service';
import style from './LoginForm.module.css';
import { useNavigate } from 'react-router-dom';

export const LoginForm = ({ handleLogin }) => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleChange = (e, set) => {
    set(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const test = authService.login(user, password).then((d) => {
      console.log('d', d);
      if (d.status !== 403) {
        handleLogin();
        navigate('/');
      }
    });

    console.log('test', test);
    //navigate('/');
  };
  return (
    <div className='container'>
      <form className={style.loginForm} onSubmit={handleSubmit}>
        <h2>Login:</h2>
        <div className={style['form-group']}>
          <label htmlFor='user'>Username or Email</label>
          <input
            type='text'
            name='user'
            id='user'
            onChange={(e) => handleChange(e, setUser)}
          />
        </div>
        <div className={style['form-group']}>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            id='password'
            onChange={(e) => handleChange(e, setPassword)}
          />
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  );
};
