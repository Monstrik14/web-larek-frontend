import { IUserInfo } from "../types";
import { Form } from "./Form";
import { IEvents } from "./base/events";

export class Contacts extends Form<IUserInfo> {
  constructor(_container: HTMLFormElement, protected events: IEvents) {
    super(_container, events);
  }

  set phoneNumber(value: string) {
    (this._container.elements.namedItem('phone') as HTMLInputElement).value = value;
  }

  set emailAddress(value: string) {
    (this._container.elements.namedItem('email') as HTMLInputElement).value = value;
  }
  
  clearFields() {
    this.phoneNumber = '';
    this.emailAddress = '';
  }
}