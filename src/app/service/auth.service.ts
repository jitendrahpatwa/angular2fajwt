import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import {environment}  from '../../environments/environment';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public http: HttpClient,public router: Router) { 
  
  }

  test() {
  	console.log('environment', environment);
  }

  setHeaders(token?) {
  		console.log('token', token)
	  	const httpOptions = {
		  headers: new HttpHeaders({
		    'Content-Type':  'application/json',
		    'authorization': 'Bearer '+token,
		    'x-user': sessionStorage.getItem('username'),
		  })
		};
		return httpOptions;
  }

  setHeaders2(token?) {
  		console.log('token', token)
	  	const httpOptions = {
		  headers: new HttpHeaders({
		    'Content-Type':  'application/json',
		    'x-user': sessionStorage.getItem('username'),
		  })
		};
		return httpOptions;
  }

  setHeaders1(token?) {
	  	const httpOptions = {
		  headers: new HttpHeaders({
		    'Content-Type':  'application/json'
		  })
		};
		return httpOptions;
  }

  query(api, token?): Observable<any> {
  	return this.http.get(environment.apiLink + api, this.setHeaders(token));
  }


  login(data: any, api, token?): Observable<any>  {
  	const postParam = data
  	return this.http.post(environment.apiLink + api, postParam, this.setHeaders1());
  }

  submit(data: any, api, token?): Observable<any>  {
  	const postParam = data
  	return this.http.post(environment.apiLink + api, postParam, this.setHeaders(token));
  }

  gfa(data: any, api, token?): Observable<any>  {
  	const postParam = data
  	return this.http.post(environment.apiLink + api, postParam, this.setHeaders(token));
  }


  verify(data: any, api, token?): Observable<any>  {
  	const postParam = data
  	return this.http.post(environment.apiLink + api, postParam, this.setHeaders2(token));
  }

  logout() {
  	sessionStorage.clear();
	this.router.navigate(['/']);
  }
}
