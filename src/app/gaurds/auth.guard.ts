import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let token = sessionStorage.getItem('token');
    let gfa = sessionStorage.getItem('usergfa');
    if ((!token && token == null) || (!gfa && gfa == null)) {
    	return false;
    }
    /*else if (gfa == true) {
    	return true;
    }*/
    return true;
  }
  
}
