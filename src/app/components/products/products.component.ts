import { Component, CUSTOM_ELEMENTS_SCHEMA , OnInit } from '@angular/core';
import {A11y, Mousewheel, Navigation, Pagination, SwiperOptions} from 'swiper';


import { Product, CreateProductDTO, UpdateProductDTO } from '../../models/product.model';

import { StoreService } from '../../services/store.service';
import { ProductsService } from '../../services/products.service';
import { register } from 'swiper/element/bundle'

register();



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],

})
export class ProductsComponent implements OnInit {

  myShoppingCart: Product[] = [];
  total = 0;
  products: Product[] = [];
  showProductDetail = false;
  limit = 10;
  offset = 0;

  productChosen: Product = {
    id: '',
    price: 0,
    images: [],
    title: '',
    category: {
      id: '',
      name: ''
    },
    description: ''
  };

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    this.productsService.getProductsByPage(10,0)
    .subscribe(data => {
      this.products = data;
    });
  }

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toggleProductDetail(){
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetail(id: string) {
    this.productsService.getProduct(id)
    .subscribe(data => {
      this.toggleProductDetail();
      this.productChosen = data;
    })
  }

  createNewProduct() {
    const product: CreateProductDTO = {
      title: 'Piedra Filosofal',
      description: 'Una roca de valor infinito',
      images: [`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTedfV_uCzovjJejZ7yt8YYET00MJrPTkmJS_o9WetyAmfbMRLwhnlPm1pmUR-2cXGIKnw&usqp=CAU`],
      price: 8,
      categoryId: 2
    } 
    this.productsService.create(product)
    .subscribe(data => {
      this.products.unshift(data)
    });
  }

  updateProduct() {
    const changes: UpdateProductDTO = {
      title: 'La piedra RojaStone'
    }
    const id = this.productChosen.id;
    this.productsService.update(id, changes)
    .subscribe(data => {
      const productIndex = this.products.findIndex(item => item.id === this.productChosen.id);
      this.products[productIndex] = data;
      this.productChosen = data;
    })
  }

  deleteProduct() {
    const id = this.productChosen.id;
    this.productsService.delete(id)
    .subscribe(data => {
      const productIndex = this.products.findIndex(item => item.id === this.productChosen.id);
      this.products.splice(productIndex, 1);
      this.showProductDetail = false;
    });
  }

  loadMore() {
    this.productsService.getProductsByPage(this.limit,this.offset)
    .subscribe(data => {
      this.products.push(...data);
      this.offset += this.limit;
    });
  }


}
