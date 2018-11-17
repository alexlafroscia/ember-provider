import Component from '@ember/component';
import { inject as provider } from 'ember-provider';

import NotifyOnInit from '../mixins/notify-on-init';
import layout from '../templates/components/inject-and-render-provider';

export default Component.extend(NotifyOnInit, {
  layout,

  dummy: provider('dummy')
});
