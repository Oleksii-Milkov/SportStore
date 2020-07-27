import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { RestService } from 'src/app/rest.service';
import { of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Product } from 'src/app/product.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  public product: Product = {};
  public myForm: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private restService: RestService,
    private router: Router
  ) {
    this.activatedRoute.paramMap
      .pipe(
        mergeMap((params: ParamMap) => {
          if (params.has("id")) {
            return this.restService.getProduct(+params.get("id"));
          } else {
            return of(null);
          }
        })
      ).subscribe((res) => {
        this.product = res;
      });
  }

  ngOnInit() {
    this.myForm = new FormGroup({
      "name": new FormControl("", Validators.required),
      "category": new FormControl("", Validators.required),
      "description": new FormControl("", Validators.required),
      "price": new FormControl("", Validators.required)
    })
  }

  public goBack(): void {
    this.router.navigate(["/admin/main"]);
  }

  public editProduct() {
    this.restService.editProduct(
      this.product.id,
      this.myForm.get("name").value,
      this.myForm.get("description").value,
      this.myForm.get("category").value,
      this.myForm.get("price").value).subscribe((res) => {
        this.goBack();
      });
  }


}
