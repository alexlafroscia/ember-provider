import { IEmberObjectWithParentView, IProviderKlass } from './interfaces';
import { Provider } from '../index';
import EmberObject from '@ember/object';

export default function findParentProvider(
  injectedProviders: WeakMap<EmberObject, Provider[]>,
  component: IEmberObjectWithParentView,
  ProviderKlass: IProviderKlass
): Provider | undefined {
  if (component.parentView) {
    const parentProviders = injectedProviders.get(component.parentView);
    let provider;

    if (parentProviders) {
      provider = parentProviders.find(p => p instanceof ProviderKlass);
    }

    return provider
      ? provider
      : findParentProvider(
          injectedProviders,
          component.parentView,
          ProviderKlass
        );
  }

  return undefined;
}
