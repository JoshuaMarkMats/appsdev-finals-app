import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = ''
  password = ''

  constructor(
    private auth: AngularFireAuth, 
    private userService: UserService, 
    private firestore: AngularFirestore
  )  {}

  //le login
  login() {
    //check if password is empty
    if(this.password.trim() === '') {
      alert('Please fill in a password');
      return;
    }

    this.auth
      .signInWithEmailAndPassword(this.email, this.password)
      .then(response =>{
        alert('Successfully logged in!');

        /*this.userService.currentUser = {
        uid: response.user?.uid,
        email: this.email
        }

        //check if current user is admin
        this.userService.isAdmin = this.checkAdmin(this.email);*/
        this.fetchUserInfo(response.user?.uid);
      })
      .catch(error => {
      alert('Error logging in:' + error);
      })
  }

  //store info from database
  private fetchUserInfo(userID: string | undefined): void {
    if (userID) {
      this.firestore
      .collection('users')
      .doc(userID)
      .valueChanges()
      .subscribe((user:any) => {
        if (user) {
          //user info
          this.userService.currentUser = {
            uid:userID,
            email: user.email
          };
          //whether user is an admin
          this.userService.isAdmin = this.checkAdmin(this.email);
        }       
      });
    }    
  }

  //runnin a check for administrator
  private checkAdmin(email: string): boolean {
    if (email === 'admin@example.com')
      alert("Hello, Administrator.");
    return email === 'admin@example.com';
  }

  //le register
  register() {
    if (this.password.trim() === '')
    {
      alert("Password cannot be empty");
      return;
    }

    this.auth.createUserWithEmailAndPassword(this.email, this.password).then(response => {
      alert("Sucessfully registered and logged in!");

      this.firestore.collection('users').doc(response.user?.uid).set({
        email: this.email
      });
    })
    .catch(error =>{
      alert("Error Registering: " + error);
    })
  }
}
