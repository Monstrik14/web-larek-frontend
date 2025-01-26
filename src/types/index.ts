
type сategories =
| 'soft-skill'
| 'hard-skill'
| 'additional'
| 'other'
| 'button';

export interface IMainPage {
  cards: IProduct[];
  total: number; 
}

export interface IProduct {
  id: string;
  title: string;
  image: string;
  description: string;
  category: сategories;
  price: number | null;
  buyProductBtn: string;
}

export interface IBasket {
  items: string[];
  total: number | null;
}

export interface IOrder{
  items: string[]
  address: string;
  email: string;
  phone: string;
  paymentMethod: 'cash' | 'card'
  total: number;
}

export interface IValidation {
  errors: string[]; 
	validation: boolean; 
}

export interface IFinalOrder {
  id: string;
  total: number | null;
}




