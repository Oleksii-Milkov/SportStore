import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  public myForm: FormGroup;
  public hasError: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.myForm = new FormGroup({
      "name": new FormControl("", Validators.required),
      "password": new FormControl("", Validators.required)
    })
  }

  public navigateTo(route: string) {
    this.router.navigate([route]);
  }

  public login() {
    this.hasError = false;
    const isAuth = this.authService.logIn(
      this.myForm.get("name").value,
      this.myForm.get("password").value
    );
    if (isAuth) {
      this.router.navigate(["/admin/main"]);
    } else {
      this.hasError = true;
    }
  }

}
