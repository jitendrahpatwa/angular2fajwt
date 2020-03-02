import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = '';
  locationType: any;

  constructor() {

  	this.locationType = location;
  	// console.log(this.locationType);
  }
}
