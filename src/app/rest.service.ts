import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product.model';
import { Order } from './order.model';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }

  public getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>("http://localhost:3000/product");
  }

  public getProduct(id: number): Observable<Product> {
    return this.http.get<Product>("http://localhost:3000/product/" + id);
  }

  public editProduct(id: number, name: string, description: string, category: string, price: number): Observable<Product> {
    return this.http.put<Product>("http://localhost:3000/product/" + id, { name, description, category, price });
  }

  public addProduct(name: string, description: string, category: string, price: number): Observable<Product> {
    return this.http.post<Product>("http://localhost:3000/product", {
      name, description, category, price
    });
  }

  public deleteProduct(id: number): Observable<Product> {
    return this.http.delete<Product>("http://localhost:3000/product/" + id);
  }

  public addOrder(order: Order): Observable<any> {
    return this.http.post<any>("http://localhost:3000/order", order);
  }

  public getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>("http://localhost:3000/order");
  }

  public shipOrder(order: Order): Observable<Order> {
    return this.http.post<Order>("http://localhost:3000/shipedOrders", order);
  }

  public getAllShippedOrders(): Observable<Order[]>{
    return this.http.get<Order[]>("http://localhost:3000/shipedOrders");
  }

  public deleteShippedOrder(id: number): Observable<Order> {
    return this.http.delete<Order>("http://localhost:3000/shipedOrders/" + id);
  }

  public deleteOrder(id: number): Observable<Order> {
    return this.http.delete<Order>("http://localhost:3000/order/" + id);
  }
}
