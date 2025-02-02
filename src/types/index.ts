export type category =
	| 'другое'
	| 'софт-скил'
	| 'дополнительное'
	| 'кнопка'
	| 'хард-скил';

export type CategoryMap = {
		 [Key in  category]: string;
};

export interface IAction {
  onClick: () => void;
}

export interface IUserInfo {
	payment: 'cash' | 'card';
	address: string;
	email: string;
	phone: number;
}

export interface ISuccess {
	total: number;
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
	button: string;
	orderIndex?: number;
}
export interface IBasket { 
	items: IProduct[];
	total: number | null;
}

export interface IModal {
	content: HTMLElement
}

export interface IOrderResult {
	id: string;
	total: number | null;
}

export interface IPage {
	items: IProduct[];
	total: number;
}

export interface ICardAction {
   onClick: (event: MouseEvent) => void;
   price: number | null;
   title: string;
   index?: number;
  }

export interface IValidation {
		valid: boolean; 
		errors: string[]; 
	}