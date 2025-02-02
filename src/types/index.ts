export type category =
	| 'другое'
	| 'софт-скил'
	| 'дополнительное'
	| 'кнопка'
	| 'хард-скил';

export type CategoryMap = {
		 [Key in  category]: string;
};

export interface IUserInfo {
	payment: 'cash' | 'card';
	address: string;
	email: string;
	phone: number;
}

export interface IOrder {
	payment: 'cash' | 'card';
	email: string;
	phone: string;
	address: string;
	total: number;
	items: string[]; 
}

export interface IProduct {
	id: string;
	title: string;
	category: category;
	description: string;
	price: number | null;
	image: string;
	buyButton: string;
}
export interface IBasket { 
	items: IProduct[];
	total: number | null;
}

export interface IOrderResult {
	id: string;
	total: number | null;
}

export interface IPage {
	cards: IProduct[];
	total: number;
}

export interface ICardAction {
   onClick: (event: MouseEvent) => void;
   price: number | null;
   title: string;
   index?: number;
  }