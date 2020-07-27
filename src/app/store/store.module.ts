import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreComponent } from './store/store.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { RouterModule } from '@angular/router';
import { CartService } from './cart/cart.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckoutGuard } from './checkout/checkout.guard';

@NgModule({
  declarations: [StoreComponent, CartComponent, CheckoutComponent],
  imports: [
    CommonModule, FormsModule, RouterModule.forChild([
      {
        path: "store",
        component: StoreComponent
      },
      {
        path: "cart",
        component: CartComponent
      },
      {
        path: "checkout",
        canActivate: [CheckoutGuard],
        component: CheckoutComponent
      }
    ]), ReactiveFormsModule
  ],
  providers: [CartService]
})
export class StoreModule { }
