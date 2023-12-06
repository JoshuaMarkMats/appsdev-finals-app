// projects.component.ts
import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent {
  projects$: Observable<any[]>;

  constructor(private firestore: AngularFirestore, public userService: UserService) {
    this.projects$ = this.firestore.collection('projects').valueChanges();
  }

  deleteProject(idPath : string, name : string) : void {
    if (confirm(`Delete ${name}?`) == true)
      this.firestore.doc(idPath).delete();
  }
}
