import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SideBarService {
  private sidebarOpenSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private productsSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  private cartCounterSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor() { }

  toggleSidebar() {
    this.sidebarOpenSubject.next(!this.sidebarOpenSubject.value);
  }

  isSidebarOpen(): Observable<boolean> {
    return this.sidebarOpenSubject.asObservable();
  }

  addProduct(product: any): void {
    const currentProducts = this.productsSubject.getValue();
    const updatedProducts = [...currentProducts, product];
    this.productsSubject.next(updatedProducts);
  }

  getProducts(): Observable<any> {
    return this.productsSubject.asObservable();
  }

  removeProduct(product: any): void {
    const currentProducts = this.productsSubject.getValue();
    const updatedProducts = currentProducts.filter(p => p.id !== product.id);
    this.productsSubject.next(updatedProducts);
  }

  getCartCounter(): Observable<number> {
    return this.cartCounterSubject.asObservable();
  }

  setCartCounter(counter: number): void {
    this.cartCounterSubject.next(counter);
  }

}
