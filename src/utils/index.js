export default class Token {
  
  constructor() {
    this.tokenKey = 'token'
  }

  getToken() {
    return localStorage.getItem(this.tokenKey)
  }

  setToken(value) {
    localStorage.setItem(this.tokenKey, value)
  }

  deleteToken() {
    localStorage.deleteItem(this.tokenKey)
  }
}
