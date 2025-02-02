import { IProduct, IOrder, IUserInfo } from "../types"
import { IEvents } from "./base/events";

export class AppData {
protected _cartItems: IProduct[] = []; 
protected  _productList: IProduct[] = [];
protected _userData: Partial<IOrder> = { 
  payment: 'cash', 
  email: '', 
  phone: '', 
  address: '' 
};
protected currentpreview: string = ''; 
protected _validationErrors: Partial<Record<keyof IOrder, string>>;

constructor(protected events: IEvents) {
}


set userData (data: Partial<IOrder>){
  this.userData = data
}

set productList(items: Partial<IProduct[]>) {
  this._productList = items;
  this.events.emit('items:update', items); 
}

get productList() { return this._productList; }
get userData() { return this._userData; }
get	cartItems() { return this._cartItems }

get totalCartPrice(): number | null { 
    return this.cartItems.reduce((acc, item) => acc + item.price, 0)
} 


get formErrors() { return this._validationErrors }
get countBasket() { return this.cartItems.length }

setPreviewItem(card: IProduct) {
  this.currentpreview = card.id;
  this.events.emit('preview:update', card);
}


getUser(): Omit<IOrder, 'total' | 'items'> {
  return {
    email: this._userData.email,
    phone: this._userData.phone,
    address: this._userData.address,
    payment: this._userData.payment }
  }

getCartItemIds() {
    return this.cartItems.map(item => item.id);
}

findProductById(id: string) {
  return this.productList.find(item => item.id === id);
}


addToCart(id: string) {
  this._cartItems.push(this._productList.find(item => item.id === id));
  this.events.emit('basket:change')
} 
removeFromCart(id: string) {
  this._cartItems = this.cartItems.filter(item => item.id !== id);
  this.events.emit('basket:change'); 
}

clearCart() {
  this._cartItems = [];
  this.events.emit('basket:change');
}

validateUserData(): boolean {
    const errors: typeof this._validationErrors = {};
    if (!this.userData.address) {
     errors.address = 'Необходимо указать адрес';
    }
    if (!this.userData.payment) {
     errors.payment = 'Необходимо указать способ оплаты';
    }
    if (!this.userData.email) {
     errors.email = 'Необходимо указать email';
    }
    if (!this.userData.phone) {
     errors.phone = 'Необходимо указать номер телефона';
    }
    this._validationErrors = errors;
    this.events.emit('input:validationError', this.formErrors);
    return Object.keys(errors).length === 0;
   }

resetOrder() {
  this._userData = { payment: 'cash', email: '', phone: '', address: '', total: 0, items: [] };
  this.events.emit('inpit:validationError')
} 

updateOrderField(field: keyof IUserInfo, value: string & 'cash' | 'card') {
  this._userData[field] = value;
  this.validateUserData()
}

isProductInCart(id: string): boolean {
  return this.cartItems.some((item) => item.id === id);
}

getField() {
  return this.userData.payment;
}
}



