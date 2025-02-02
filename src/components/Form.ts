import { IValidation } from "../types";
import { ensureElement } from "../utils/utils";
import { Component } from "./base/Component";
import { IEvents } from "./base/events";

export class Form<T> extends Component<IValidation> {
  protected _submitBtn: HTMLButtonElement;
  protected _errorContainer: HTMLElement;

  constructor(protected _container: HTMLFormElement, protected events: IEvents) {
    super(_container);
    this._submitBtn = ensureElement<HTMLButtonElement>('button[type="submit"]', this._container);
    this._errorContainer = ensureElement<HTMLElement>('.form__errors', this._container);

    this._container.addEventListener('input', (e: Event) => {
      const target = e.target as HTMLInputElement;
      const field = target.name as keyof T;
      const value = target.value;
      this.handleInputChange(field, value);
    });

    this._container.addEventListener('submit', (event) => {
      event.preventDefault();
      this.events.emit(`${this._container.name}:submit`);
    });
  }

  set validity(state: boolean) {
    this.setBlocked(!state, this._submitBtn);
  }

  set errorMessage(message: string) {
    this._errorContainer.textContent = message;
  }

  protected handleInputChange(field: keyof T, value: string) {
    this.events.emit('orderInput:change', {
      field,
      value,
    });
  }

  render(state: Partial<T> & IValidation) {
    Object.assign(this, state);
    super.render(state);
    return this._container;
  }
}