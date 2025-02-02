import { IOrder } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Form } from "./Form";
import { IEvents } from "../base/events";

export class Order extends Form<Partial<IOrder>> {
  protected btnCard: HTMLButtonElement;
  protected btnCash: HTMLButtonElement;
  protected deliveryAddressField: HTMLInputElement;

  constructor(_container: HTMLFormElement, protected events: IEvents) {
    super(_container, events);
    this.btnCard = ensureElement<HTMLButtonElement>('button[name="card"]', this._container);
    this.btnCash = ensureElement<HTMLButtonElement>('button[name="cash"]', this._container);
    this.deliveryAddressField = ensureElement<HTMLInputElement>('input[name="address"]', this._container);

    this.btnCash.addEventListener('click', () => this.handlePaymentChange('cash'));
    this.btnCard.addEventListener('click', () => this.handlePaymentChange('card'));
  }

  set paymentMethod(value: string) { 
    this.btnCard.classList.toggle('button_alt-active', value === 'card');
    this.btnCash.classList.toggle('button_alt-active', value === 'cash');
  }

  set deliveryAddress(value: string) {
    this.deliveryAddressField.value = value;
  }
  
  clearData() {
    this.deliveryAddress = '';
    this.resetPaymentButtons();
  }
  resetPaymentButtons() {
    this.btnCard.classList.remove('button_alt-active');
    this.btnCash.classList.remove('button_alt-active');
  }


  private handlePaymentChange(paymentType: string) {
    this.handleInputChange('payment', paymentType);
  }
}