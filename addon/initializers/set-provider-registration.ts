import Application from '@ember/application';

export function initialize(owner: Application) {
  owner.registerOptionsForType('provider', {
    instantiate: false
  });
}

export default {
  initialize
};
