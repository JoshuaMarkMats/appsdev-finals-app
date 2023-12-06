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
  //show login or signup depending
  signingUp : boolean = false;

  username = ''
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
          UserService.currentUser = {
            username: user.username,
            uid :userID,
            email: user.email
          };
          //whether user is an admin
          UserService.isAdmin = this.checkAdmin(this.email);
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
      alert("Sucessfully registered!");

      this.firestore.collection('users').doc(response.user?.uid).set({
        username: this.username,
        email: this.email
      });

      //the login portion, really just the body of login() copied
      this.auth
      .signInWithEmailAndPassword(this.email, this.password)
      .then(response =>{
        this.fetchUserInfo(response.user?.uid);
      })
      .catch(error => {
      alert('Error logging in:' + error);
      })
    })
    .catch(error =>{
      alert("Error Registering: " + error);
    })
  }

  toggleSignup() {
    this.signingUp = !this.signingUp;
  }
}
