import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../cart/cart.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Order } from 'src/app/order.model';
import { RestService } from 'src/app/rest.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  public submitted: boolean = false;
  public myForm: FormGroup;

  constructor(
    private router: Router,
    private cartService: CartService,
    private restService: RestService
  ) { }

  ngOnInit(): void {
    this.myForm = new FormGroup({
      name: new FormControl("", Validators.required),
      email: new FormControl("", Validators.required),
      phone: new FormControl("", Validators.required),
      address: new FormControl("", Validators.required)
    })
  }

  public navigateTo(route: string) {
    this.router.navigate([route]);
  }

  public completeOrder() {
    this.restService.addOrder(new Order(
      this.cartService.get(),
      this.myForm.get('name').value,
      this.myForm.get('email').value,
      this.myForm.get('phone').value,
      this.myForm.get('address').value
    )).subscribe((res) => {
      this.submitted = true;
      this.cartService.clearCart();
    });
  }

}
