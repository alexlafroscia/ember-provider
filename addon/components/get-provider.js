import Component from '@ember/component';
import { assert } from '@ember/debug';
import { defineProperty } from '@ember/object';
import { inject } from 'ember-provider';

import layout from '../templates/components/get-provider';

const GetProvider = Component.extend({
  layout,

  provider: undefined,
  providerInstance: undefined,

  init() {
    this._super(...arguments);

    assert('A `provider` property must be present', !!this.provider);

    defineProperty(this, 'providerInstance', inject(this.provider));
  }
});

GetProvider.reopenClass({
  positionalParams: ['provider']
});

export default GetProvider;
