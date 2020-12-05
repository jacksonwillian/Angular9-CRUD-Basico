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


  showMessage(msg: string): void {
    this.snackBar.open(msg, "X", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    })
  }
 
}
