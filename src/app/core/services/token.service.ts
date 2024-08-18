import { Injectable } from '@angular/core';
const KEY_ITEM = 'accountToken';
@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  setToken(accountToken: string) {
    sessionStorage.setItem(KEY_ITEM, accountToken);
  }

  removeToken() {
    sessionStorage.removeItem(KEY_ITEM);
  }

  getToken() {
    if (this.hasToken()) {
      return sessionStorage.getItem(KEY_ITEM) as string;
    } else {
      return ''
    }
  }


  hasToken() {
    return !!sessionStorage.getItem(KEY_ITEM);
  }
}
