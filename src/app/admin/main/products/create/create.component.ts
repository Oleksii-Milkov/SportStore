import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RestService } from 'src/app/rest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  public myForm: FormGroup;

  constructor(
    private restService: RestService,
    private router: Router
  ) { }

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

  public createProduct() {
    this.restService.addProduct(
      this.myForm.get("name").value, this.myForm.get("category").value, this.myForm.get("description").value, this.myForm.get("price").value
    ).subscribe((res) => {
      this.goBack();
    })
  }

}
