import EmberObject, { computed } from '@ember/object';
import { getOwner } from '@ember/application';

import { Registry } from './index';
import Provider from './provider';

const HAVE_MODIFIED = new WeakSet<EmberObject>();
const PROVIDERS = new WeakMap<EmberObject, Array<Provider>>();

export default function inject<K extends keyof Registry>(identifier: K) {
  return computed<Registry[K]>(function(this: EmberObject) {
    const owner = getOwner(this);
    const provider = owner.lookup(`provider:${identifier}`);

    // Modify the host class to also destroy providers
    if (!HAVE_MODIFIED.has(this)) {
      const originalDestroy = this.willDestroy;
      const context = this;
      this.willDestroy = function() {
        PROVIDERS.get(this)!.forEach(p => p.destroy());

        originalDestroy.apply(context, arguments);
      };

      HAVE_MODIFIED.add(this);
    }

    // Keep track of which providers are injected into each object
    if (PROVIDERS.has(this)) {
      PROVIDERS.get(this)!.push(provider);
    } else {
      PROVIDERS.set(this, [provider]);
    }

    return provider;
  });
}
