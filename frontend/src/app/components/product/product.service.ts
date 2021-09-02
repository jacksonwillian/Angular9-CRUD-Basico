import { Product } from './product.model';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products: Array<Product> = [];
  
  constructor(private snackBar: MatSnackBar) {}
  
  create(product: Product): Observable<Product> {
    let id = this.products.length;
    product.id = id;
    this.products.push(product);
    const observable = new Observable<Product>(subscriber => {
        subscriber.next(product);
        subscriber.complete();
    });
    return observable;
  }  


  read(): Observable<Product[]>{    
    const observable = new Observable<Product[]>(subscriber => {
        subscriber.next(this.products);
        subscriber.complete();
    });
    return observable;
  }
  
 
  readById(id: number): Observable<Product> {
    let productFound = this.products.filter(
        (_product: Product) => {
            return _product.id == id;
        },
    )[0];
    const observable = new Observable<Product>(subscriber => {
        subscriber.next(productFound);
        subscriber.complete();
    });
    return observable;
  }

  update(product: Product): Observable<Product> {
    let productFound = this.products.filter(
        (_product: Product) => {
            return product.id == _product.id;
        },
    )[0];

    let index = this.products.indexOf(productFound);

    if (index != -1) {
        this.products[index] = product;
        const observable = new Observable<Product>(subscriber => {
            subscriber.next(product);
            subscriber.complete();
        });
        return observable;
    }
  }

  delete(id: number): Observable<Product> {
    let productFound = this.products.filter(
        (_product: Product) => {
            return _product.id == id;
        },
    )[0];

    let index = this.products.indexOf(productFound);

    if (index > -1) {
        this.products.splice(index, 1);
    }
    const observable = new Observable<Product>(subscriber => {
        subscriber.next(productFound);
        subscriber.complete();
    });
    return observable;
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
