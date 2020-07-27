import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isAuth: boolean = false;

  constructor() { }

  public logIn(name: string, password: string): boolean {
    this.isAuth = name === "admin" && password === "123";
    return this.isAuth;
  }

  public logOut(): void {
    this.isAuth = false;
  }
}
