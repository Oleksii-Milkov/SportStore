import { Injectable } from '@angular/core';
import { Product } from 'src/app/product.model';
import { Position } from 'src/app/position.model';

@Injectable()

export class CartService {

  private positions: Position[] = [];

  constructor() { }

  public get(): Position[] {
    return this.positions;
  }

  public getQuantity() {
    let result = 0;
    this.positions.forEach(position => {
      result += position.quantity;
    });
    return result;
  }

  public add(product: Product) {
    const position: Position = this.positions.find((pos) => product.id === pos.product.id);
    if (position) {
      position.quantity++;
    }
    else {
      this.positions.push(new Position(product, 1));
    }
  }

  public remove(position) {
    this.positions.splice(this.positions.indexOf(position), 1);
  }

  public increment(position: Position) {
    return position.quantity++;
  }

  public decrement(position: Position) {
    if (position.quantity > 1) {
      return position.quantity--;
    }
  }

  public getTotal() {
    let result = 0;
    this.positions.forEach(position => {
      result += position.getSubTotal();
    });
    return result;
  }

  public clearCart() {
    this.positions = [];
  }
}
