import { Component, OnInit, Output } from '@angular/core';
import { RestService } from 'src/app/rest.service';
import { Product } from 'src/app/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public productList: Product[] = [];
  private step: number = 0;

  constructor(
    private restService: RestService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.restService.getAllProducts().subscribe(
      (res) => {
        this.productList = res;
      });
  }

  public getFilteredArray(): any {
    return this.productList.slice(0, 8 + this.step);
  }

  public moreProducts(): void {
  
    this.step += 4;
  }

  public editProduct(id: number) {
    this.router.navigate(["/admin/main/products/edit", id]);
  }

  public createProduct() {
    this.router.navigate(["/admin/main/products/create"])
  }

  public deleteProduct(id: number) {
    this.restService.deleteProduct(id).subscribe((res) => {
      this.restService.getAllProducts().subscribe((res) => {
        this.productList = res;
      })
    })
  }

}
