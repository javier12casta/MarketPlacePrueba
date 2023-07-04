import { Component, OnInit} from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map } from 'rxjs';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SideBarService } from '../../services/sideBar.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  categoryId: any;
  filteredProducts: any[] = [];
  searchForm!: FormGroup;

  constructor(private productService: ProductsService, private route: ActivatedRoute, private sidebarService: SideBarService) { }

  ngOnInit() {
    this.searchForm = new FormGroup({
      searchTerm: new FormControl('')
    });
    this.route.queryParams.subscribe(params => {      
      this.searchForm?.controls['searchTerm'].setValue((params['title'] || ''));
      this.categoryId = params['categoryId'];
      if(params){
        this.searchProducts();
      }
    });
    this.searchProducts();
  }

  searchProducts(){    
    const filters = {
      title: this.searchForm?.controls['searchTerm'].value || '',
      categoryId: this.categoryId || '',
      price: '',
      price_min: '',
      price_max: '',
    };
    this.productService.getProductsBy(filters).subscribe((resp: any[]) => {
      this.products = resp;
    });
  }

  addProductToSidebar(product: any): void {
    this.sidebarService.addProduct(product);
  }
}
