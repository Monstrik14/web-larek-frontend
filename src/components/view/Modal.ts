import { IModal } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/events";

export class Modal extends Component<IModal> {
  protected _closeBtn: HTMLButtonElement;
  protected _contentContainer: HTMLElement;
  constructor(_container: HTMLElement, protected events: IEvents) {
    super(_container);
    this._closeBtn = ensureElement<HTMLButtonElement>('.modal__close', _container);
    this._contentContainer = ensureElement<HTMLElement>('.modal__content', _container);
    this._closeBtn.addEventListener('click', () => this.hideModal());
    this._container.addEventListener('click', (event) => {
      if (event.target === this._container) {
        this.hideModal();
      }
    });
  }
  set content(value: HTMLElement) {
    this._contentContainer.replaceChildren(value);
  }
  
  hideModal() {
    this._container.classList.remove('modal_active');
    this.events.emit('modal:close');
  }
  showModal() {
    this._container.classList.add('modal_active');
    this.events.emit('modal:open');
  }

  render(data: IModal): HTMLElement {
    super.render(data);
    return this._container;
  }
}