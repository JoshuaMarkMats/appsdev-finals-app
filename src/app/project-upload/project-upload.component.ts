import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserService } from '../user.service';
import { finalize } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  constructor(private store: AngularFirestore) {}

  uploadTest() {
    this.store.collection('projects').doc(this.projectName).set({
      imageUrl: this.imageUrl,
      description: this.description,
      projectLink: this.projectLink
    })
  }
}
