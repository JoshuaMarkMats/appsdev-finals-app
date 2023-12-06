import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  currentUser = {
    username: '' as string,
    uid: '' as string,
    email: '' as string
  } 

  isAdmin: boolean = false;

  constructor() {}
}