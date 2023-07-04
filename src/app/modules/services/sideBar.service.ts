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
  /**
  * @author Javier Castañeda
  * @purpose servicio para abrir y cerrar sidenav del carro de productos
  */
  toggleSidebar() {
    this.sidebarOpenSubject.next(!this.sidebarOpenSubject.value);
  }
  /**
  * @author Javier Castañeda
  * @purpose servicio para validar el estado del sidenav del carro de productos
  */
  isSidebarOpen(): Observable<boolean> {
    return this.sidebarOpenSubject.asObservable();
  }
  /**
  * @author Javier Castañeda
  * @purpose servicio producto al carro de productos
  * @param {product} product objeto del producto
  */
  addProduct(product: any): void {
    const currentProducts = this.productsSubject.getValue();
    const updatedProducts = [...currentProducts, product];
    this.productsSubject.next(updatedProducts);
  }
  /**
  * @author Javier Castañeda
  * @purpose servicio para obtener los productos del carro
  */
  getProducts(): Observable<any> {
    return this.productsSubject.asObservable();
  }
  /**
  * @author Javier Castañeda
  * @purpose servicio para remover los productos del carro
  * @param {product} product objeto del producto
  */
  removeProduct(product: any): void {
    const currentProducts = this.productsSubject.getValue();
    const updatedProducts = currentProducts.filter(p => p.id !== product.id);
    this.productsSubject.next(updatedProducts);
  }
  /**
  * @author Javier Castañeda
  * @purpose servicio para el contador del productos
  */
  getCartCounter(): Observable<number> {
    return this.cartCounterSubject.asObservable();
  }
  /**
  * @author Javier Castañeda
  * @purpose servicio para actualizar el contador de productos
  * @param {counter} counter valor numerico del contador
  */
  setCartCounter(counter: number): void {
    this.cartCounterSubject.next(counter);
  }

}
