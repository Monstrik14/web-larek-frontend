import { EventEmitter } from "../components/base/events";

// interface корзины скнопками + и -
interface basketModel{
  items: Map<string, number>;
  add(id:string):void;
  remove(id:string):void
}

// пример отображения товара в корзине

interface Product {
  id: string;
  title: string;
}
interface basketGoods {
  items: Product[];
  setItems (items: Product[]):void;
  getItems (id:string):Product
}

// отображение элемента разметки

interface Constructor {
  new (container: HTMLElement, events?: EventEmitter): IView;
}

interface IView {
  render(data?: object): HTMLElement;
}

//подгружае данные через api

api.getBasketgoods(){
  .then(basketGoods.setItems.bind(basketGoods))
  catch(err =>console.error(err))
}

