import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-project-upload',
  templateUrl: './project-upload.component.html',
  styleUrls: ['./project-upload.component.css'],
})
export class ProjectUploadComponent {
  projectName = ''
  imageUrl = ''
  description = ''
  projectLink = ''

  constructor(
    private store: AngularFirestore, 
    private router: Router
    ) {
      if (!UserService.currentUser.username)
        this.router.navigate(['/projects']);
    }

  uploadProject() {
    this.store.collection('projects').doc(this.projectName).set({
      author: UserService.currentUser.username,
      imageUrl: this.imageUrl,
      description: this.description,
      projectLink: this.projectLink
    })
    alert("Project Published!");
    this.router.navigate(['/projects']);
  }
}
