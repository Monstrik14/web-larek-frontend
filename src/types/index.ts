import { EventEmitter } from "../components/base/events";

// interface корзины скнопками + и -
interface IBasketModel{
  items: Map<string, number>;
  add(id:string):void;
  remove(id:string):void
}

interface ILotItem {
  
}
interface IProduct {
  id: string;
  title: string;
  category: string;
  description: string;
  price: Map<number, string> | null;
  image: string;
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

interface Constructor {
  new (container: HTMLElement, events?: EventEmitter): IView;
}

interface IView {
  render(data?: object): HTMLElement;
}

// подгружаемые данные через api
 

// фунеция осздания карточки 

function createCard(template: HTMLTemplateElement, name: string) {
  const cardElement = template.content.querySelector('.card-preview').cloneNode(true) as HTMLElement;
  return cardElement 
}