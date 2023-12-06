import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserService } from '../user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  username = ''
  email = ''
  password = ''

  constructor(
    private auth: AngularFireAuth, 
    private firestore: AngularFirestore,
    private userService: UserService
  )  {}
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
        this.userService.fetchUserInfo(response.user?.uid);
      })
      .catch(error => {
      alert('Error logging in:' + error);
      })
    })
    .catch(error =>{
      alert("Error Registering: " + error);
    })
  }
}
