import Component from '@ember/component';
import EmberObject from '@ember/object';

import { IProviderKlass } from './interfaces';
import { Provider } from '../index';

type ComponentWithParentView = Component & {
  parentView?: Component;
};

export default function findParentProvider(
  injectedProviders: WeakMap<EmberObject, Provider[]>,
  component: ComponentWithParentView,
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
