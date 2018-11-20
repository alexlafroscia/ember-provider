import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { Provider } from 'ember-provider';

module('Integration | Component | get-provider', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.set('onInit', (type, context) => {
      this.set(type, context);
    });

    this.owner.register(
      'provider:dummy',
      class extends Provider {
        constructor() {
          super(...arguments);

          this.name = 'Foo Bar';
        }
      }
    );
  });

  test('looking up a provider', async function(assert) {
    await render(hbs`
      {{#get-provider provider='dummy' as |provider|}}
        {{provider.name}}
      {{/get-provider}}
    `);

    assert.dom().hasText('Foo Bar', 'Yields the correct provider');
  });

  test('using a positional param', async function(assert) {
    await render(hbs`
      {{#get-provider 'dummy' as |provider|}}
        {{provider.name}}
      {{/get-provider}}
    `);

    assert.dom().hasText('Foo Bar', 'Yields the correct provider');
  });

  test('looking up a parent provider', async function(assert) {
    await render(hbs`
      {{#parent-component onInit=(action onInit 'parent')}} 
        {{get-provider 'current-user' onInit=(action onInit 'getProvider')}}
      {{/parent-component}}
    `);

    assert.equal(
      this.parent.get('currentUser'),
      this.getProvider.get('providerInstance'),
      'Components are sharing the same provider instance'
    );
  });

  test('creating provider for child component', async function(assert) {
    await render(hbs`
      {{#get-provider 'current-user' onInit=(action onInit 'getProvider') as |provider|}}
        {{child-component onInit=(action onInit 'child')}}
      {{/get-provider}}
    `);

    assert.equal(
      this.getProvider.get('providerInstance'),
      this.child.get('currentUser'),
      'Components are sharing the same provider instance'
    );
  });

  test('getting a provider from the current context', async function(assert) {
    await render(hbs`
      {{inject-and-render-provider
          onInit=(action onInit 'parent')
          onGetProviderInit=(action onInit 'getProvider')
      }} 
    `);

    assert.equal(
      this.parent.get('dummy'),
      this.getProvider.get('providerInstance'),
      'Components are sharing the same provider instance'
    );
  });
});
