import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories: any[] =[];
  
  constructor(private productService: ProductsService) { }

  ngOnInit() {
    this.productService.getCategories().subscribe((resp: any) => {
      this.categories = resp;
    });
  }

}
