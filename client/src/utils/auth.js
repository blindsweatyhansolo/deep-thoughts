// JWT AUTH SCRIPT
import decode from 'jwt-decode';

class AuthService {
  // retrieve data saved in token
  getProfile() {
    return decode(this.getToken());
  }

  // check is user is still logged in
  loggedIn() {
    // checks is there is a saved and valid token
    const token = this.getToken();
    // type coersion to check is token is NOT undefined and NOT expired
    return !!token && !this.isTokenExpired(token);
  }

  // check is token is expired
  isTokenExpired(token) {
    try {
      const decoded = decode(token);

      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  }

  //  retrieve token from localStorage
  getToken() {
    return localStorage.getItem('id_token');
  }

  // set token to localStorage and reload to homepage
  login(idToken) {
    localStorage.setItem('id_token', idToken);

    window.location.assign('/');
  }

  // clear token from localStorage and force logout with reload
  logout() {
    localStorage.removeItem('id_token');

    window.location.assign('/');
  }
};

// instantiating a new AuthService version for ever component importing it ensures that a new
// version of the functionality is used and takes the risk out of remnant data
export default new AuthService();