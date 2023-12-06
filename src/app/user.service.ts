import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

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

  constructor( private firestore: AngularFirestore) {}

  //store info from database
  public fetchUserInfo(userID: string | undefined): void {
    if (userID) {
      this.firestore
      .collection('users')
      .doc(userID)
      .valueChanges()
      .subscribe((user:any) => {
        if (user) {
          //user info
          this.currentUser = {
            username: user.username,
            uid :userID,
            email: user.email
          };
          //whether user is an admin
          this.isAdmin = this.checkAdmin(user.email);
        }       
      });
    }    
  }

  //runnin a check for administrator
  public checkAdmin(email: string): boolean {
    if (email === 'admin@example.com')
      alert("Hello, Administrator.");
    return email === 'admin@example.com';
  }
}