import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from '../service/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
  	private authService: AuthService,
  	private toastr: ToastrService
  ) { }

  ngOnInit() {
  	this.authService.test();

  	// create form
  	this.form = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
      is2Fa: [false,[]],
      code: ['',[]]
    });
  }

  submit(form?) {
  	if (this.form.valid && this.form.get('is2Fa').value == false) {
  		this.authService.login(this.form.value, 'auth/login').subscribe(
  			d => {
  				if (d.status == 'ok') {
  					this.toastr.success(d.message, null);
  					console.log(d);
  					sessionStorage.setItem('username', d.body.user.username);
  					sessionStorage.setItem('usergfa', d.body.user.gfa);
  					sessionStorage.setItem('userrole', d.body.user.roles.role);
  					sessionStorage.setItem('name', d.body.user.name);
  					sessionStorage.setItem('email', d.body.user.email);
  					sessionStorage.setItem('token', d.body.token);

  					if (d.body.user.gfa) {
  						this.form.get('is2Fa').setValue(true);
  						// this.router.navigate(['/home']);
  					} else {
  						this.router.navigate(['/home']);
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
  	} else if (this.form.valid && this.form.get('is2Fa').value == true) {
  		this.authService.verify(this.form.value, 'auth/verify/gfa').subscribe(
  			d => {
  				if (d.status == 'ok') {
  					this.toastr.success(d.message, null);
  					console.log(d);
  					sessionStorage.setItem('username', d.body.user.username);
  					sessionStorage.setItem('usergfa', d.body.user.gfa);
  					sessionStorage.setItem('userrole', d.body.user.roles.role);
  					sessionStorage.setItem('name', d.body.user.name);
  					sessionStorage.setItem('email', d.body.user.email);
  					sessionStorage.setItem('token', d.body.token);

  					this.router.navigate(['/home']);
  				} else {
					this.toastr.error('Credential mismatch!', null);
  				}
  			},
  			e => {
  				this.toastr.error('Internal server error', null);
  				console.log(e);
  			}
  		)
  	} else {
		this.toastr.error('Please try again, system is busy.', null);
  	}
  }

}
