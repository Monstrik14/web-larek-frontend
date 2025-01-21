import { EventEmitter } from "../components/base/events";
import { Component } from "../components/base/components";

type price = number | null
type payment = 'cash' | 'online'

interface IProduct {
  id: string;
  title: string;
  category: string;
  description: string;
  price: price;
  image: string;
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

interface IOrderResult {
  id: string;
  total: price;
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
  address: string
}

// отображение элемента разметки

interface IProductConstructor {
  new (): Component<IProduct>;
}

interface IView {
  render(data?: object): HTMLElement;
}