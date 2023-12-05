import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = ''
  password = ''

  constructor(private auth: AngularFireAuth, private firestore: AngularFirestore)  {}

  login() {
    if(this.password.trim() === '') {
      alert('Please fill in a password');
      return;
    }

    const fictionalEmail = '${this.email}@example.com';

    this.auth.signInWithEmailAndPassword(fictionalEmail, this.password).then(response =>{
      alert('Successfully logged in!');

      //check for admin
      /*if (fictionalEmail === 'admin@example.com') {
        alert('Administrator logged in!')
      }*/
    })
    .catch(error => {
      alert('Error logging in:' + error);
    })
  }

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
