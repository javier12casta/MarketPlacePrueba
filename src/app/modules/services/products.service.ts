import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
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

  /**
  * @author Javier Castañeda
  * @purpose Servicio para obtener listado de productos mediante filtros
  */
  getProductsBy(filters: any): Observable<any> {
    const httpOptions = {
      params: new HttpParams()
        .set('title', filters?.title || '')
        .set('categoryId', filters?.categoryId || '')
        .set('price', filters?.price || '')
        .set('price_min', filters?.price_min || '')
        .set('price_max', filters?.price_max || '')
    };
    return this.http.get<any>(`${platziUrl}products/`, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

}
