import { Component, OnInit } from '@angular/core';
import { SideBarService } from '../../services/sideBar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isSidebarOpen: boolean = false;
  cartItems: any[] = [];

  constructor(private sidebarService: SideBarService) { }

  ngOnInit() {

  }

  openSideBar(){
    this.sidebarService.toggleSidebar();
    this.isSidebarOpen = this.sidebarService.isSidebarOpen();
  }

}
