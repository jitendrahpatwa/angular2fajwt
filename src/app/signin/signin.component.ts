import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  
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
      email: ['', Validators.compose([Validators.required, Validators.email])],
      name: ['', Validators.compose([Validators.required])],
    });
  }

  submit(form?) {
  	if (this.form.valid) {
  		this.authService.login(this.form.value, 'auth/add/user').subscribe(
  			d => {
  				if (d.status == 'ok') {
  					this.toastr.success(d.message, null);
  					console.log(d);
  					this.router.navigate(['/login']);
  				} else {
					this.toastr.error('Data already added or something went wrong!', null);
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
