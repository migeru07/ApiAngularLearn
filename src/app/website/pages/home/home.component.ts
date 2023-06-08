import { Component, OnInit  } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { Product } from '../../../models/product.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: Product[] = [];
  productId: string | null = null;
  limit = 10;
  offset = 0;

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.productsService.getAllProducts(10,0)
    .subscribe(data => {
      this.products = data;
      this.offset += this.limit;
    });
    this.route.queryParamMap.subscribe(params => {
      this.productId = params.get('product');
      console.log(this.productId);
    })
  }

  loadMore() {
    this.productsService.getProductsByPage(this.limit,this.offset)
    .subscribe(data => {
      this.products.push(...data);
      this.offset += this.limit;
    });
  }

  handleLoadMore() {
    this.loadMore();
  }

}
