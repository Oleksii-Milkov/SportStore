import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import { Position } from 'src/app/position.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public productList: Position[] = [];

  constructor(
    public cartService: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.productList = this.cartService.get();
  }

  public remove(position: Position) {
    this.cartService.remove(position);
  }

  public increment(position: Position) {
    this.cartService.increment(position);
  }

  public decrement(position: Position) {
    this.cartService.decrement(position);
  }

  public navigateTo(route: string){
    this.router.navigate([route]);
  }

  public isEmpty(): boolean{
    return this.cartService.get().length == 0;
  }

}
