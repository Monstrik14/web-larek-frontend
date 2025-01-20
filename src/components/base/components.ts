export abstract class Component<T> {
	constructor(protected readonly container: HTMLElement) {}
	//Методы для работы с ДОМ

	//Переключение класса
	toggleClass(element: HTMLElement, className: string, force?: boolean) {
		element.classList.toggle(className, force);
	}

  	// Возврат DOM-элемента
	render(data: Partial<T>): HTMLElement {
		Object.assign(this as object, data ?? {});
		return this.container;
	}
}