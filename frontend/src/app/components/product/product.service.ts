import { Product } from './product.model';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  private baseUrl = "http://localhost:5000/products";

  
  constructor(private snackBar: MatSnackBar,
    private http: HttpClient) { }

  
  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product).pipe(
        map((obj) => obj),
        catchError(e => this.errorHandler(e))
    );
  }  


  read(): Observable<Product[]>{
    return this.http.get<Product[]>(this.baseUrl).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    );
  }
  
 
  readById(id: string): Observable<Product> {
    let urlToGetProduct = `${this.baseUrl}/${id}`;
    return this.http.get<Product>(urlToGetProduct).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    );
  }


  update(product: Product): Observable<Product> {
    let urlToUpdateProduct = `${this.baseUrl}/${product.id}`;
    return this.http.put<Product>(urlToUpdateProduct, product).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    );
  }


  delete(id: string): Observable<Product> {
    let urlToDeleteProduct = `${this.baseUrl}/${id}`;
    return this.http.delete<Product>(urlToDeleteProduct).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    );
  }


  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, "X", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-success']
    })
  }
  

  errorHandler(e : any): Observable<any> {
    this.showMessage("Ocorreu um erro!", true);
    return EMPTY;
  }
 
}
