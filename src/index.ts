import { ICardAction, IOrder, ISuccess, IUserInfo } from './types/index';
import { AppData } from './components/model/AppData';
import { Cart } from './components/view/Cart';
import { Contacts } from './components/view/Contacts';
import { Modal } from './components/view/Modal';
import { Page } from './components/view/Page';
import { EventEmitter } from './components/base/events';
import { WebLarekApi } from './components/model/WebLarekApi';
import './scss/styles.scss';
import { API_URL, CDN_URL } from './utils/constants';
import { cloneTemplate, ensureElement } from './utils/utils';
import {  Success } from './components/view/Success';
import { IPage, IProduct } from './types';
import { Order } from './components/view/Order';
import { Card, CardOnPage, FullCard } from './components/view/Card';

const body = ensureElement<HTMLElement>('body');
const modalContainer = ensureElement<HTMLElement>('#modal-container')

const catalogCardTemplate = ensureElement<HTMLTemplateElement>('#card-catalog'); 
const productPreviewTemplate =
	ensureElement<HTMLTemplateElement>('#card-preview'); 
	const basketItemTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketModalTemplate = ensureElement<HTMLTemplateElement>('#basket');
const orderModalTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsModalTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successModalTemplate = ensureElement<HTMLTemplateElement>('#success');
const events = new EventEmitter()
const api = new WebLarekApi(API_URL, CDN_URL)
const appData = new AppData(events)
const modal = new Modal(modalContainer, events)
const page = new Page (body, events);
const cart = new Cart (cloneTemplate<HTMLTemplateElement>(basketModalTemplate), events);
 const contacts = new Contacts(cloneTemplate<HTMLFormElement>(contactsModalTemplate), events);
const order = new Order(cloneTemplate<HTMLFormElement>(orderModalTemplate), events);

const success = new Success(cloneTemplate<HTMLDivElement>(successModalTemplate), events, {
	onClick: () => {
		modal.hideModal()
	}
})

api.getProducts().then((data: IPage) => {
	appData.productList = data.items
})

events.on('items:update', () => {
	page.cardContainer = appData.productList.map((item: IProduct) => {
		const card = new CardOnPage(cloneTemplate<HTMLTemplateElement>(catalogCardTemplate), {
			onClick: () =>  events.emit('card:select', item),
			title: item.title,
			price: item.price,
		});
		return card.render({
			title: item.title,
			image: item.image,
			price: item.price,
			id: item.id,
			category: item.category
		})
	})
})


events.on('modal:open', () => {
	page.toggleScrollLock = true;
})


events.on('modal:close', () => {
	page.toggleScrollLock = false;
})

events.on('card:select', (item: IProduct) => {
	appData.setPreviewItem(item)
})

events.on('preview:update', (item: IProduct) => {
	const itemInBasket = appData.isProductInCart(item.id)
		const fullCard = new FullCard(cloneTemplate<HTMLTemplateElement>(productPreviewTemplate), {
		onClick: () => {
			if (itemInBasket) {
				events.emit('basket:removeItem', item)
			} else {
				events.emit('basket:addItem', item)
			}
			modal.hideModal()
			},
			price: item.price,
			title: item.title
		} as ICardAction)
		modal.render({
			content: fullCard.render({
			title: item.title,
			image: item.image,
			 price: item.price,
			id: item.id,
			category: item.category,
			description: item.description,
			button:  itemInBasket ? 'Удалить из корзины' : 'В корзину' 
		})
  })
  modal.showModal()
})


events.on('basket:change', () => {
	page.cartCount = appData.countBasket;
	cart.finalPrice = appData.totalCartPrice;
	cart.productList = appData.cartItems.map((item: IProduct, index) => {
		const card = new Card(cloneTemplate(basketItemTemplate), {
			onClick: () => events.emit('basket:removeItem', item),
			price: item.price,
			title: item.title,
	})
	
	return card.render({
		title: item.title,
		price: item.price,
		orderIndex: index + 1
	})
})
})



events.on('basket:addItem', (item: IProduct) => {
	appData.addToCart(item.id)
})

events.on('basket:removeItem', (item: IProduct) => {
	appData.removeFromCart(item.id)
})


events.on('basket:show', () => {
	modal.render({
		content: cart.render({}),
		
	});
	modal.showModal()
});



events.on('basket:checkout', () => {
	order.clearData()
	contacts.clearFields()
	modal.render({
		content: order.render({
		valid: false,
		errors: [],
		address: '',
		payment: null,
	})
})
})


events.on('input:validationError', (errors: Partial<IUserInfo>) => {
	const { payment, address, email, phone } = errors;
	order.validity = !payment && !address;
	contacts.validity = !email && !phone;
	order.errorMessage = Object.values({ address, payment })
		.filter((i) => !!i)
		.join('; ');
	contacts.errorMessage = Object.values({ phone, email })
		.filter((i) => !!i)
		.join('; ');
	order.paymentMethod = appData.getField();
});


events.on('orderInput:update',
	(data: { field: keyof IUserInfo; value: string }) => {
		appData.updateOrderField(data.field, data.value as 'cash' | 'card');
	}
);


events.on('contacts:send', () => {
	const payload = {
    ...appData.getUser(),
    total: appData.totalCartPrice,
    items: appData.getCartItemIds()
  };
	api
		.postOrder(payload)
		.then((result: IOrder) => {
			events.emit('order:completed', result);
			appData.clearCart();
			page.cartCount = appData.countBasket;
		})
		.catch((error: unknown) => {
			console.error('Ошибка отправки заказа:', error);
		});
});

events.on('order:send', () => {
	modal.render({
		content: contacts.render({
			valid: false,
			errors: [],
		}),
	});
});

events.on('order:completed', (result: ISuccess) => {
	modal.render({
		content: success.render({
			total: result.total,
		}),
	});
	contacts.clearFields();
	 order.clearData();
	appData.resetOrder();
	appData.clearCart();
});
