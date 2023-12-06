import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

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
    private firestore: AngularFirestore,
    private userService: UserService,
    private router: Router
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
        this.userService.fetchUserInfo(response.user?.uid);
        this.router.navigate(['']);
      })
      .catch(error => {
      alert('Error logging in:' + error);
      })
  }

}
