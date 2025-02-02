import { IBasket } from "../types";
import { createElement, ensureElement } from "../utils/utils";
import { Component } from "./base/Component";
import { IEvents } from "./base/events";

export class Basket extends Component<IBasket> {
  protected _productList: HTMLElement; 
  protected _finalPrice: HTMLElement; 
  protected _orderButton?: HTMLButtonElement;

  constructor(_container: HTMLElement, protected events: IEvents) {
    super(_container);
    this._productList = ensureElement<HTMLElement>('.basket__list', this._container);
    this._finalPrice = ensureElement<HTMLElement>('.basket__price');
    this._orderButton = _container.querySelector('.basket__button') as HTMLButtonElement;
  
    if (this._orderButton) {
      this._orderButton.addEventListener('click', () => this.events.emit('basket:toOrder'));
    }

    this.productList = [];
  }

  set productList(items: HTMLElement[]) {
    if (items.length) {
      this._productList.replaceChildren(...items);
      this._orderButton?.removeAttribute('disabled');
    } else {
      this._productList.replaceChildren(
        createElement<HTMLElement>('p', { textContent: 'Корзина пуста' })
      );
      this._orderButton?.setAttribute('disabled', 'disabled');
    }
  }

  set finalPrice(total: number) {
    this.setText(`${total} синапсов`, '.basket__price');
  }
}