import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { SideBarService } from '../../services/sideBar.service';

@Component({
  selector: 'app-products-detail',
  templateUrl: './products-detail.component.html',
  styleUrls: ['./products-detail.component.scss']
})
export class ProductsDetailComponent implements OnInit {
  product: any;
  constructor(private productService: ProductsService, private route: ActivatedRoute, private sidebarService: SideBarService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {      
      this.productService.getProductsById(params['id']).subscribe((resp: any[]) => {
        this.product = resp;
      });
    },() => {
      this.product = '';
    });
  }
  /**
  * @author Javier Castañeda
  * @purpose metodo para agregar los productos del carro
  */
  addProductToSidebar(): void {
    this.sidebarService.addProduct(this.product);
  }
  /**
  * @author Javier Castañeda
  * @purpose metodo para remover los productos del carro
  */
  removeProductToSidebar(): void {
    this.sidebarService.removeProduct(this.product);
  }

}
