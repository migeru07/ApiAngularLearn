import { Component, OnInit } from '@angular/core';

import { StoreService } from '../../services/store.service';
import { AuthService } from 'src/app/services/auth.service';
import { CategoriesService } from 'src/app/services/categories.service';

import { User } from 'src/app/models/user.model';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  activeMenu = false;
  counter = 0;
  categories: Category[] = [];
  profile: User = {
    id: '', 
    name: '',
    email: '',
    password: ''  
  };

  constructor(
    private storeService: StoreService,
    private authService: AuthService,
    private categoriesService: CategoriesService
  ) { }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length;
    });
    this.getAllCategories();
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

  getAllCategories() {
    this.categoriesService.getAll()
    .subscribe(data => {
      this.categories = data;      
    })
  }

}
