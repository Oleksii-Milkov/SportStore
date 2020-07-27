import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/rest.service';
import { Order } from 'src/app/order.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  public orderList: Order[] = [];
  public shipped: boolean = false;

  constructor(
    private restService: RestService
  ) { }

  ngOnInit(): void {
    this.restService.getAllOrders().subscribe((res) => {
      this.orderList = res;
    });

  }

  public ship(order: Order) {
    let tmp = order.id;
    order.id = null
    this.restService.shipOrder(order).subscribe((res) => {
      order.id = tmp;
      this.restService.getAllOrders().subscribe((res) => {
        this.orderList = res;
      });
      this.deleteOrder(order.id);
    });
  }

  public deleteOrder(id: number) {
    if (this.shipped) {
      this.restService.deleteShippedOrder(id).subscribe((res) => {
        this.restService.getAllShippedOrders().subscribe((res) => {
          this.orderList = res;
        });
      })
    } else {
      this.restService.deleteOrder(id).subscribe((res) => {
        this.restService.getAllOrders().subscribe((res) => {
          this.orderList = res;
        });
      })
    }

  }

  public showShipped() {
    this.shipped = !this.shipped;
    if (this.shipped) {
      this.restService.getAllShippedOrders().subscribe((res) => {
        this.orderList = res;
      });
    } else {
      this.restService.getAllOrders().subscribe((res) => {
        this.orderList = res;
      });
    }
  }

}
