import Component from '@ember/component';
import { inject as provider } from 'ember-provider';

import layout from '../templates/components/child-component';
import NotifyOnInit from '../mixins/notify-on-init';

export default Component.extend(NotifyOnInit, {
  layout,

  currentUser: provider('current-user')
});
