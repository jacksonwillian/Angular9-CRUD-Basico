import { Product } from './product.model';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  private baseUrl = "http://localhost:5000/products";

  
  constructor(private snackBar: MatSnackBar,
    private http: HttpClient) { }

  
  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product);
  }  


  read(): Observable<Product[]>{
    return this.http.get<Product[]>(this.baseUrl);
  }
  
 
  readById(id: string): Observable<Product> {
    let urlToGetProduct = `${this.baseUrl}/${id}`;
    return this.http.get<Product>(urlToGetProduct);
  }


  update(product: Product): Observable<Product> {
    let urlToUpdateProduct = `${this.baseUrl}/${product.id}`;
    return this.http.put<Product>(urlToUpdateProduct, product);
  }

  showMessage(msg: string): void {
    this.snackBar.open(msg, "X", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    })
  }
 
}
