import { ICardAction, IProduct, category } from "../../types";
import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";
import { categoryMap } from "../../utils/constants";

export class Card extends Component<IProduct> {
  
	protected	_price: HTMLElement;
  protected _title: HTMLElement; 
	protected  _index: HTMLElement;
	protected  _button: HTMLButtonElement;
  constructor (_container: HTMLElement, action?: ICardAction) {
    super(_container)
    this._title = ensureElement<HTMLElement>('.card__title', _container);
    this._button = _container.querySelector('.card__button');
    this._price = ensureElement<HTMLElement>('.card__price', _container);
    this._index = _container.querySelector('.basket__item-index');
  
		if (action?.onClick) {
			if (this._button) {
				this._button.addEventListener('click', action.onClick);
			} else {
				_container.addEventListener('click', action.onClick);
			}
		}
  }

	set button(value: string){
    this.setText(value, '.button')
  }
  set index(value: string) {
    if (this._index) { 
      this.setText(value, '.basket__item-index');
     }
  } 
  set id(value: string) {
    this._container.dataset.id = value;
  }
  set title(value: string){
    this.setText(value, '.card__title')
  }
  set price (price: string) {
    this.setText(price ? `${price} синапсов` : 'Бесценно', '.card__price');
		if (this._button) {
			this._button.disabled = !price;
		}
  }
} 

export class CardOnPage extends Card {
  protected	_category: HTMLElement;
  protected	_image: HTMLImageElement;

  constructor(_container: HTMLElement, action?: ICardAction) { 
    super(_container, action)
    this._category = ensureElement<HTMLElement>('.card__category', _container);
    this._image = ensureElement<HTMLImageElement>('.card__image', _container);
   }
   set category(value: category) {
     this.setText(value, '.card__category');
     this.switchClass(this._category, categoryMap[value], true);
    }
    
       set image(src: string){
        this.setImage(this._image, src)
       } 
  }

export class FullCard extends CardOnPage {
  protected	_description: HTMLElement;
  constructor(_container: HTMLElement, action?: ICardAction) { 
    super(_container, action)
    this._description = ensureElement<HTMLElement>('.card__text', _container);
   }

   set description(value: string){
    this.setText(value, '.card__text')
   }
}