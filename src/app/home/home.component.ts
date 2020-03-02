import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  data: any = {};
  form: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
  	private authService: AuthService,
  	private toastr: ToastrService
  ) { 
  	this.data['name'] = sessionStorage.getItem('name');
  	this.data['username'] = sessionStorage.getItem('username');
  	this.data['email'] = sessionStorage.getItem('email');
  	this.data['userrole'] = sessionStorage.getItem('userrole');
  	this.data['usergfa'] = sessionStorage.getItem('usergfa');

  	this.form = this.formBuilder.group({
      username: [this.data['username'], Validators.compose([Validators.required])],
      code: ['', []],
      enable: [false, []]
    });
  }

  ngOnInit() {
  	let data = {
  	}
  	let token = sessionStorage.getItem('token');
  	this.authService.query('auth/details', token).subscribe(
		d => {
			if (d.status == 'ok') {
				this.toastr.success(d.message, null);
				console.log(d, this.data);
				this.data['qa'] = d.body.qa;
				if (this.data['userrole'] !== d.body.user.roles.role) {
					this.authService.logout();
				}
				
			} else {
				this.toastr.error('Credential mismatch!', null);
			}
		},
		e => {
			this.toastr.error('Internal server error', null);
			console.log(e);
		}
	)
  }

  logout() {
  	this.authService.logout();
  }

  submit(tok?) {
	let token = sessionStorage.getItem('token');
	let data = {
		code: this.form.get('code').value,
		gfa: true,
		username: this.form.get('username').value
	}
  	this.authService.gfa(data,'auth/gfa', token).subscribe(
		d => {
			if (d.status == 'ok') {
				this.toastr.success(d.message, null);
				console.log(d, this.data);
				
			} else {
				this.toastr.error('OTP mismatch!', null);
			}
		},
		e => {
			this.toastr.error('Internal server error', null);
			console.log(e);
		}
	)
  }

}
