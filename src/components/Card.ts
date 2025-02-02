import { ICardAction, IProduct, category } from "../types";
import { ensureElement } from "../utils/utils";
import { Component } from "./base/Component";
import { CategoryMap } from "../types";
import { categoryMap } from "../utils/constants";

export class Card extends Component<IProduct> {
  protected _heading: HTMLElement; 
	protected _cost: HTMLElement;
	protected _actionButton: HTMLButtonElement;
	protected _order: HTMLElement;

  constructor (_container: HTMLElement, action?: ICardAction) {
    super(_container)
    this._heading = ensureElement<HTMLElement>('.card__title', _container);
    this._cost = ensureElement<HTMLElement>('.card__price', _container);
    this._actionButton = _container.querySelector('.card__button');
    this._order = _container.querySelector('.basket__item-index');
  
		if (action?.onClick) {
			if (this._actionButton) {
				this._actionButton.addEventListener('click', action.onClick);
			} else {
				_container.addEventListener('click', action.onClick);
			}
		}
  }

  set orderIndex(value: string) {
    if (this._order) { 
      this.setText(value, '.basket__item-index');
     }
  } 

	set actionButton(value: string){
    this.setText(value, '.button')
  }

  set id(value: string) {
    this._container.dataset.id = value;
  }

  set cost(price: string) {
    this.setText(price ? `${price} синапсов` : 'Бесценно', '.card__price');
		if (this._actionButton) {
			this._actionButton.disabled = !price;
		}
  }

  set heading(value: string){
    this.setText(value, '.card__title')
  }
} 

export class CardOnPage extends Card {
  protected _image: HTMLImageElement;
	protected _categoryTag: HTMLElement;

  constructor(_container: HTMLElement, action?: ICardAction) { 
    super(_container, action)
    this._image = ensureElement<HTMLImageElement>('.card__image', _container);
    this._categoryTag = ensureElement<HTMLElement>('.card__category', _container);
   }

  set image(src: string){
    this.setImage(this._image, src)
   } 

  set categoryTag(value: category) {
      this.setText(value, '.card__category');
      this.switchClass(this._categoryTag, categoryMap[value], true);
   }
}

export class FullCard extends CardOnPage {
  protected _desc: HTMLElement;
  
  constructor(_container: HTMLElement, action?: ICardAction) { 
    super(_container, action)
    this._desc = ensureElement<HTMLElement>('.card__text', _container);
   }

  set desc(value: string){
    this.setText(value, '.card__text')
   }
}