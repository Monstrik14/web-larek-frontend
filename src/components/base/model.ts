import { IEvents } from './events';

export abstract class Model<T> {
	constructor(data: Partial<T>, protected events: IEvents) {
		Object.assign(this, data);
	}

  //Сообщаем, что изменилось и с какими именно данными
  emitChanges(event: string, payload?: object) {
		this.events.emit(event, payload ?? {});
	}
} 