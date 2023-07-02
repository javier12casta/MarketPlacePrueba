import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';


const platziUrl = environment.platziUrl;

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  handleError(error: HttpErrorResponse): any {
    return throwError(error);
  }

  /**
  * @author Javier Castañeda
  * @purpose Servicio que lista los productos
  */
  getProducts(): Observable<any> {
    return this.http.get<any>(`${platziUrl}products`)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
  * @author Javier Castañeda
  * @purpose Servicio que lista las categorias de productos
  */
  getCategories(): Observable<any> {
    return this.http.get<any>(`${platziUrl}categories`)
      .pipe(
        catchError(this.handleError)
      );
  }

    /**
  * @author Javier Castañeda
  * @purpose Servicio que obtiene producto por id
  * @param {id} id id del producto
  */
    getProductsById(id: number): Observable<any> {
      return this.http.get<any>(`${platziUrl}products/${id}`)
        .pipe(
          catchError(this.handleError)
        );
    }

}
