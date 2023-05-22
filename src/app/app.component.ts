import { Component } from '@angular/core';

import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgParent = '';
  showImg = true;

  constructor(
    private authService: AuthService,
    private UsersService: UsersService
  ) { }

  onLoaded(img: string) {
    console.log('log padre', img);
  }

  toggleImg() {
    this.showImg = !this.showImg;
  }

  createUser() {
    this.UsersService.create({
      name: 'Pedro',
      email: 'rock@mail.com',
      password: '123123'
    })
    .subscribe(rta => {
      console.log(rta);
    })
  }

  login() {
    this.authService.login('rock@mail.com','123123')
    .subscribe(rta => {
      console.log(rta.access_token);
    })
  }

}
