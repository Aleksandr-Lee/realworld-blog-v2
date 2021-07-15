export default class LocalStorageService {
  static getToken = () => {
    const token = localStorage.getItem('token');
    if (token !== null) {
      return token;
    }
    return false;
  };
}
