import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import td from 'testdouble';
import EmberObject from '@ember/object';
import { getOwner } from '@ember/application';
import { inject as provider } from 'ember-provider';

const WithCurrentUser = EmberObject.extend({
  currentUser: provider('current-user')
});

const WithDestroyBehavior = EmberObject.extend({
  user1: provider('current-user'),
  user2: provider('current-user'),

  willDestroy: td.function('will-destroy')
});

module('Unit | provider', function(hooks) {
  setupTest(hooks);

  test('can inject a provider into an object', function(assert) {
    const obj = WithCurrentUser.create(this.owner.ownerInjection());

    assert.deepEqual(obj.get('currentUser').fetch(), {
      name: 'Alex'
    });
  });

  test('different objects get different instances of the provider', function(assert) {
    const obj1 = WithCurrentUser.create(this.owner.ownerInjection());
    const obj2 = WithCurrentUser.create(this.owner.ownerInjection());

    assert.notEqual(obj1.get('currentUser'), obj2.get('currentUser'));
  });

  test('it destroys the provider when the object is destroyed', function(assert) {
    const obj = WithDestroyBehavior.create(this.owner.ownerInjection());

    td.replace(obj.get('user1'), 'destroy');
    td.replace(obj.get('user2'), 'destroy');
    obj.willDestroy();

    assert.verify(obj.willDestroy(), { times: 1 });
    assert.verify(obj.get('user1').destroy());
    assert.verify(obj.get('user2').destroy());
  });

  test('the provider has access to the `owner`', function(assert) {
    const obj = WithCurrentUser.create(this.owner.ownerInjection());
    const provider = obj.get('currentUser');

    assert.equal(getOwner(provider), this.owner);
  });
});
