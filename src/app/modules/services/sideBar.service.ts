import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SideBarService {
  private sidebarOpenSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public sidebarOpen: Observable<boolean> = this.sidebarOpenSubject.asObservable();
  
  constructor() { }

  toggleSidebar() {
    this.sidebarOpenSubject.next(!this.sidebarOpenSubject.value);
  }

  isSidebarOpen() {
    return this.sidebarOpenSubject.getValue();
  }
}
