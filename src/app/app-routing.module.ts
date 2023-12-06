import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProjectsComponent } from './projects/projects.component';
import { StudentsComponent } from './students/students.component';
import { LoginComponent } from './login/login.component';
import { ProjectUploadComponent } from './project-upload/project-upload.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'projects', component: ProjectsComponent},
  {path: 'students', component: StudentsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'upload', component: ProjectUploadComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
