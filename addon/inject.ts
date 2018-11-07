import EmberObject, { computed } from '@ember/object';
import { getOwner } from '@ember/application';

import { Registry } from './index';

export default function inject<K extends keyof Registry>(identifier: K) {
  return computed<Registry[K]>(function(this: EmberObject) {
    const owner = getOwner(this);
    const provider = owner.lookup(`provider:${identifier}`);

    // Modify the host class to also destroy the provider
    const originalDestroy = this.willDestroy;
    this.willDestroy = () => {
      provider.destroy();

      originalDestroy.apply(this, arguments);
    };

    return provider;
  });
}
