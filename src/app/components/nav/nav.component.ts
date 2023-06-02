import { Component, OnInit } from '@angular/core';;

import { StoreService } from '../../services/store.service'
import { AuthService } from 'src/app/services/auth.service';

import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  activeMenu = false;
  counter = 0;
  profile: User = {
    id: '', 
    name: '',
    email: '',
    password: ''  
  };

  constructor(
    private storeService: StoreService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length;
    });
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  login() {
    this.authService.loginAndGet('juan@miguel.do','123123')
    .subscribe(user => {
      this.profile = user; 
    })
  }

}
