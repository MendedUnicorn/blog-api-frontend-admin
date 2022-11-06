const API_URL = 'http://localhost:3000/auth/';

class AuthService {
  login(user, password) {
    const data = user.includes('@')
      ? {
          email: user,
          password,
        }
      : { username: user, password };
    return fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((results) => {
        //console.log('res', results.json());
        return results.json();
      })
      .then((data) => {
        // console.log(data);
        if (data.token) {
          // console.log('set token', data.token);
          localStorage.setItem('user', JSON.stringify(data));
          return data;
        }
        console.log('going to return');
        return data;
      })
      .catch((err) => console.log('error', err))
      .finally((d) => console.log('finally', d));
  }

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
