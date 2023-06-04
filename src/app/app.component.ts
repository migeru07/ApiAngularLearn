import { Component } from '@angular/core';

import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { FilesService } from './services/files.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgParent = '';
  showImg = true;
  token = '';

  constructor(
    private authService: AuthService,
    private UsersService: UsersService,
    private filesService: FilesService
  ) { }

  onLoaded(img: string) {

  }

  toggleImg() {
    this.showImg = !this.showImg;
  }

  createUser() {
    this.UsersService.create({
      name: 'Miguel',
      email: 'juan@miguel.do',
      password: '123123'
    })
    .subscribe(() => {

    })
  }

  login() {
    this.authService.login('rock@mail.com','123123')
    .subscribe(rta => {
      this.token = rta.access_token;

    })
  }

  downloadPDF() {
    this.filesService.getFile('laHoja.pdf','https://young-sands-07814.herokuapp.com/api/files/dummy.pdf','application/pdf')
    .subscribe()
  }

}
