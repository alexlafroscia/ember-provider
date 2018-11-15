import { getOwner } from '@ember/application';
import Component from '@ember/component';
import EmberObject from '@ember/object';
import ComputedProperty from '@ember/object/computed';
import { addListener } from '@ember/object/events';
import { gte } from 'ember-compatibility-helpers';

import findParentProvider from './find-parent-provider';

import { Registry } from '../index';
import Provider from '../provider';

const INJECTED_PROVIDERS = new WeakMap<EmberObject, Provider[]>();

interface IProviderKlass extends Function {
  create: (...opts: object[]) => Provider;
}

class ProviderInjection<K extends keyof Registry> extends ComputedProperty<
  Registry[K]
> {
  constructor(identifier: K) {
    function getter(this: EmberObject) {
      const owner = getOwner(this);
      const ProviderKlass: IProviderKlass = owner.lookup(
        `provider:${identifier}`
      );

      let provider: Provider;
      let isOwner = true;

      const possibleProvider =
        this instanceof Component
          ? findParentProvider(INJECTED_PROVIDERS, this, ProviderKlass)
          : undefined;

      if (possibleProvider) {
        isOwner = false;
        provider = possibleProvider;
      } else {
        provider = ProviderKlass.create(owner.ownerInjection());
      }

      if (isOwner) {
        // Modify the host class to also destroy the provider
        const originalDestroy = this.willDestroy;

        this.willDestroy = () => {
          if (!provider.get('isDestroying') && !provider.get('isDestroyed')) {
            provider.destroy();
          }

          originalDestroy.apply(this, arguments);
        };

        // Keep track of providers in an object
        let providerList: Provider[];

        if (INJECTED_PROVIDERS.has(this)) {
          providerList = INJECTED_PROVIDERS.get(this)!;
        } else {
          providerList = [];
          INJECTED_PROVIDERS.set(this, providerList);
        }

        providerList.push(provider);
      }

      return provider;
    }

    // @ts-ignore
    super(getter, { dependentKeys: [], readOnly: true });
  }

  setup(proto: EmberObject, propertyName: K) {
    // In Ember versions below 3.0, there is no `setup` method defined on the super class,
    // but if a subclass provides it it will be called
    if (gte('3.0.0')) {
      // @ts-ignore
      super.setup(...arguments);
    }

    addListener(proto, 'init', null, function(this: EmberObject) {
      // @ts-ignore
      this.get(propertyName);
    });
  }
}

export default ProviderInjection;
