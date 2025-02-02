import { IAction, ISuccess } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/events";

export class Success extends Component<ISuccess> {
  protected _closeButton: HTMLButtonElement;
  protected _amountDisplay: HTMLElement;

  constructor(_container: HTMLElement, protected events: IEvents, action?: IAction) {
    super(_container);
    this._closeButton = ensureElement<HTMLButtonElement>('.order-success__close', this._container);
    this._amountDisplay = ensureElement<HTMLElement>('.order-success__description', this._container);
    
    if (action?.onClick) {
      this._closeButton.addEventListener('click', action.onClick);
    }
  }

  set total(value: string) {
    this.setText(`Списано ${value} синапсов`, '.order-success__description');
  }
}