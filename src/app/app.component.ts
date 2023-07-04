import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { SideBarService } from './modules/services/sideBar.service';
import { ProductsService } from './modules/services/products.service';
import { ShoppingCartComponent } from './modules/components/shoppingCart/shoppingCart.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isSidebarOpen: boolean = false;
  product: any;
  cartCounter: number = 0;

  constructor(private sidebarService: SideBarService) { }

  ngOnInit() {
    this.sidebarService.isSidebarOpen().subscribe((resp: any) => {
      this.isSidebarOpen = resp;
    });
    this.sidebarService.getProducts().subscribe((res: any) => {
      this.sidebarService.setCartCounter(res.length);
    });

  }

}
