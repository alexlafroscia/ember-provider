import { Provider } from '../index';

export interface IProviderKlass extends Function {
  create: (...opts: object[]) => Provider;
}
