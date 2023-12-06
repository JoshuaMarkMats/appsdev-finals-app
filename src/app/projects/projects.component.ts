// projects.component.ts
import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent {
  projects$: Observable<any[]>;

  constructor(private firestore: AngularFirestore) {
    this.projects$ = this.firestore.collection('projects').valueChanges();
  }
}
