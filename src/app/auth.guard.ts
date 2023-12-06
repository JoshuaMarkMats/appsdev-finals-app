import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { UserService } from "./user.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private auth: AngularFireAuth, private router: Router) {}
    
    canActivate(): boolean {
        if (UserService.currentUser.uid) {
            return true;
        }
        else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}