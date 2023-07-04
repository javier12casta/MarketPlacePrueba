import { Component, Input, OnInit } from '@angular/core';
import { SideBarService } from '../../services/sideBar.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  cartItems: any[] = [];
  searchForm!: FormGroup;
  @Input() cartCounter: number = 0;
  
  constructor(private sidebarService: SideBarService, private route: Router) { }

  ngOnInit() {
    this.searchForm = new FormGroup({
      searchValue: new FormControl('')
    });
    this.sidebarService.getCartCounter().subscribe((resp: any) => {
      this.cartCounter = resp;    
    });
  }

  openSideBar(){
    this.sidebarService.toggleSidebar();
  }

  searchProducts(): void {
    const trimmedValue = this.searchForm.controls['searchValue'].value;
    if (trimmedValue) {
      this.route.navigate(['/products'], { queryParams: { title: trimmedValue } });
    }
  }

}
