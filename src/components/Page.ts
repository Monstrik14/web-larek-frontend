import { IProduct } from "../types";
import { ensureElement } from "../utils/utils";
import { Component } from "./base/Component";
import { IEvents } from "./base/events";

export class Page extends Component<HTMLElement> {
  protected _cartCount: HTMLElement;
  protected _cardContainer: HTMLElement;
  protected _pageContainer: HTMLElement;
  protected _cart: HTMLElement;

  constructor(_container: HTMLElement, protected events: IEvents) {
    super(_container);
    this._cartCount = ensureElement<HTMLElement>('.header__basket-counter');
    this._cardContainer = ensureElement<HTMLElement>('.gallery');
    this._pageContainer = ensureElement<HTMLElement>('.page__wrapper');
    this._cart = ensureElement<HTMLElement>('.header__basket');

    if (this._cart) {
      this._cart.addEventListener('click', () => this.events.emit('basket:open'));
    }
  }

  set cartCount(count: number) {
    this.setText(count.toString(), '.header__basket-counter');
  }

  set cardContainer(items: HTMLElement[]) {
    this._cardContainer.replaceChildren(...items);
  }

  set toggleScrollLock(value: boolean) {
    this._pageContainer.classList.toggle('page__wrapper_locked', value);
  }
}