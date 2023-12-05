import { Component } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
  constructor(public userService: UserService) {}
}
