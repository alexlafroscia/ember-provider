import EmberObject from '@ember/object';

import { Provider } from '../index';

export interface IProviderKlass extends Function {
  create: (...opts: object[]) => Provider;
}

export interface IEmberObjectWithParentView extends EmberObject {
  parentView?: IEmberObjectWithParentView;
}
