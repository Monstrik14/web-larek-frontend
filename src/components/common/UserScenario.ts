import { IEvents } from '../base/events';
import { Model } from '../base/model';
import { IProduct } from "../"

export class UserScenario extends Model<IProduct> {
	protected items: IProduct[] = [];
	protected basket: IProduct[] = [];
	protected userData: IUser = {};
	protected formErrors: FormErrors = {};
	protected preview: string;