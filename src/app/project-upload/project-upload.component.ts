import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-image-upload',
  templateUrl: './project-upload.component.html',
  styleUrls: ['./project-upload.component.css'],
})
export class ProjectUploadComponent {
  /*selectedImage: File | null = null;

  constructor(
    private storage: AngularFireStorage,
    private firestore: AngularFirestore,
    private auth: AngularFireAuth
  ) {}

  uploadImage(): void {
    if (this.selectedImage) {
      const filePath = `/uploads/${Date.now()}_${this.selectedImage.name}`; //date and filename
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, this.selectedImage);

      task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {
            // Save image details to Firestore
            this.saveImageDetails(url);
          });
        })
      ).subscribe();
    }
  }

  saveImageDetails(imageUrl: string): void {
    const userId = this.auth.currentUser?.uid;
    if (userId) {
      this.firestore.collection('projects').add({
        imageUrl,
        owner: userId,
      });
    }
  }*/
}
