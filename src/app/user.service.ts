import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  static currentUser = {
    username: '' as string,
    uid: '' as string,
    email: '' as string
  } 

  static isAdmin: boolean = false;

  constructor() {}
}