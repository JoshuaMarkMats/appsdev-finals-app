import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  currentUser: any; // Modify the type based on your user data structure
  isAdmin: boolean = false;

  constructor() {}
}