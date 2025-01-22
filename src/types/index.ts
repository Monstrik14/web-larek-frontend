import { EventEmitter } from "../components/base/events";
import { Component } from "../components/base/components";

type price = number | null
type payment = 'cash' | 'card'
type category =
 | 'другое'
 | 'софт-скил'
 | 'дополнительное'
 | 'кнопка'
 | 'хард-скил';

interface IProduct {
  id: string;
  title: string;
  category: category;
  description: string;
  price: price;
  image: string;
  buyButton: string;
}

interface IOrder{
  payment: payment;
  mail: string;
  phone: string;
  address: string;
  total: number;
  items: string[]
}

interface IBasket {
  items: string[];
  total: price;
}

interface IPage {
  cards: IProduct[];
  total: number; 
}

interface IOrderResult {
  id: string;
  total: price;
}

interface IValidationForm {
	valid: boolean; 
	errors: string[]; 
}

interface IUserInfo {
  payment: payment;
  address: string;
  mail: string;
  phone: number;
}

interface IUserScenario {
  cardsCatalog: IProduct[];
  buyButton(): void;
  addToBasket(value: IProduct): void;
  placeOrder(): void;
  deleteFromBasket(): void;
  clearBasket(): void;
  getItems(): void;
  validateUserInfo(data: keyof IUserInfo, value: string): boolean; 
  goForNewThings(): void;
}

// interface корзины скнопками + и -
interface IBasketModel{
  items: Map<string, number>;
  add(id:string):void;
  remove(id:string):void
}


// пример отображения товара в корзине
interface IBasketGoods {
  items: IProduct[];
  setItems (items: IProduct[]):void;
  getItems (id:string):IProduct
}

interface Payment<T> { 
  items: IProduct[]
  payOnline: (obj: T) => T
  payCash: (obj: T) => T
}

// отображение элемента разметки

interface IView {
  render(data?: object): HTMLElement;
}