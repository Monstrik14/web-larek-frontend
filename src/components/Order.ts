import { IOrder } from "../types";
import { ensureElement } from "../utils/utils";
import { Form } from "./Form";
import { IEvents } from "./base/events";

export class Order extends Form<Partial<IOrder>> {
  protected btnCash: HTMLButtonElement;
  protected btnCard: HTMLButtonElement;
  protected deliveryAddressField: HTMLInputElement;

  constructor(_container: HTMLFormElement, protected events: IEvents) {
    super(_container, events);
    this.btnCash = ensureElement<HTMLButtonElement>('button[name="cash"]', this._container);
    this.btnCard = ensureElement<HTMLButtonElement>('button[name="card"]', this._container);
    this.deliveryAddressField = ensureElement<HTMLInputElement>('input[name="address"]', this._container);

    this.btnCash.addEventListener('click', () => this.handlePaymentChange('cash'));
    this.btnCard.addEventListener('click', () => this.handlePaymentChange('card'));
  }

  set paymentMethod(value: string) { 
    this.btnCash.classList.toggle('button_alt-active', value === 'cash');
    this.btnCard.classList.toggle('button_alt-active', value === 'card');
  }

  set deliveryAddress(value: string) {
    this.deliveryAddressField.value = value;
  }

  resetPaymentButtons() {
    this.btnCash.classList.remove('button_alt-active');
    this.btnCard.classList.remove('button_alt-active');
  }

  clearData() {
    this.resetPaymentButtons();
    this.deliveryAddress = '';
  }

  private handlePaymentChange(paymentType: string) {
    this.handleInputChange('payment', paymentType);
  }
}