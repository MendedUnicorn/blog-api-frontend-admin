import axios from 'axios';
const API_URL = 'http://localhost:3000/auth/';

class AuthService {
  login(username, password) {
    fetch(API_URL + 'login', {
      method: 'POST',
      mode: 'cors',
      headers: new Headers({
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json; charset=utf-8',
      }),
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.token) {
          localStorage.setItem('user', JSON.stringify(data));
        }
      })
      .catch((err) => console.log('error', err));
  }

  // login(username, password) {
  //   return axios
  //     .post(API_URL + 'login', {
  //       username,
  //       password,
  //     })
  //     .then((response) => {
  //       console.log(response.data);
  //       if (response.data.token) {
  //         localStorage.setItem('user', JSON.stringify(response.data.token));
  //       }

  //       return response.data;
  //     });
  // }
  logout() {
    localStorage.removeItem('user');
  }

  register(first_name, last_name, username, email, password) {
    fetch(API_URL + 'signup', {
      method: 'POST',
      mode: 'cors',
      headers: new Headers({
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json; charset=utf-8',
      }),
      body: JSON.stringify({
        first_name,
        last_name,
        username,
        email,
        password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return JSON.stringify(data.token);
      })
      .catch((err) => console.log('error', err));
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}

export default new AuthService();
