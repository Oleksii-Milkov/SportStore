import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/rest.service';
import { Product } from 'src/app/product.model';
import { CartService } from '../cart/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {

  public productList: Product[] = []; //исходный массив
  public pages: Array<Product[]> = [[]]; //массив в котором каждый подмассив- отдельная страница
  public categoriesList = []; //массив для отображения кнопок фильтрации
  public cashedList = []; //резервный массив для копирования

  public selectOptions: Array<number> = [3, 4, 6, 8]; //массив для задания количества отображаемых продуктов на странице
  public selectedOption: number = this.selectOptions[1]; //выбранное значение для select

  public activeButton: string = ""; //значение выбранной кнопки фильтрации
  public activePage: number = 0; //значение выбранной кнопки страницы 
  public selectedPage: number = 0; //значение выбранной страницы 
  
  constructor(
    private restService: RestService,
    public cartService: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.restService.getAllProducts().subscribe(
      (res) => {
        this.cashedList = this.productList = res; //заполняю основной и резервный массивы значениями
        this.getCategories();
        this.pagination();
      });
  }

  //метод заполнения массива для категорий
  public getCategories() {
    for (let i = 0; i < this.productList.length; i++) {
      if (!this.categoriesList.includes(this.productList[i].category)) {
        this.categoriesList.push(this.productList[i].category);
      }
    }
  }

  //фильтрация продуктов по категории
  public sortList(category: string) {
    this.defaultList();
    this.activeButton = category;
    this.activePage = 0;
    this.selectedPage = 0;

    for (let i = 0; i < this.productList.length; i++) {
      this.productList = this.productList.filter(product => product.category === category);
    }
    this.pagination();
  }

  //метод для возвращение к исходному массиву после фильтрованного
  public defaultList() {
    this.activeButton = null;
    this.productList = this.cashedList;
    this.pagination();
  }

  //добавление в корзину
  public add(product: Product) {
    this.cartService.add(product);
    this.toCart();
  }

  //перемещение в корзину
  public toCart() {
    if (this.cartService.get().length) {
      this.router.navigate(["/cart"]);
    }
  }

  public toAdmin(){
    this.router.navigate(["/admin/auth"]);
  }

  //метод для пагинации
  public pagination() {
    this.activePage = 0;
    this.selectedPage = 0;
    this.pages.length = Math.ceil(this.productList.length / this.selectedOption);
    for (let i = 0; i < this.pages.length; i++) {
      this.pages[i] = this.productList.slice((i * this.selectedOption), (i * this.selectedOption) + this.selectedOption);
    }
  }

  //метод для перемещения по страницам
  public switchPage(id: number) {
    this.activePage = id;
    this.selectedPage = id;
  }

}
