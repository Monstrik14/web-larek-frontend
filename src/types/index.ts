type category =
	| 'другое'
	| 'софт-скил'
	| 'дополнительное'
	| 'кнопка'
	| 'хард-скил';

interface IUserInfo {
	payment: 'cash' | 'card';
	address: string;
	mail: string;
	phone: number;
}

interface IOrder {
	payment: 'cash' | 'card';
	mail: string;
	phone: string;
	address: string;
	total: number;
	items: string[]; 
}

interface IProduct {
	id: string;
	title: string;
	category: category;
	description: string;
	price: number | null;
	image: string;
	buyButton: string;
}
interface IBasket {
	items: IProduct[];
	total: number | null;
}

interface IOrderResult {
	id: string;
	total: number | null;
}

interface IPage {
	cards: IProduct[];
	total: number;
}
