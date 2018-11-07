import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, clearRender } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import td from 'testdouble';

module('Integration | Component | provider', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.set('onInit', (type, context) => {
      this.set(type, context);
    });
  });

  module("using a parent component's provider", function() {
    test('opting into using a parent provider', async function(assert) {
      await render(hbs`
        {{#parent-component onInit=(action onInit 'parent')}}
          {{child-component onInit=(action onInit 'child')}}
        {{/parent-component}}
      `);

      assert.equal(
        this.parent.get('currentUser'),
        this.child.get('currentUser')
      );
    });

    test('falling back to creating a provider when there is no parent', async function(assert) {
      await render(hbs`
        {{child-component onInit=(action onInit 'child')}}
      `);

      assert.ok(this.child.get('currentUser'), 'The provider was created');
    });

    test('only destroying the provider when the owner is destroyed', async function(assert) {
      this.set('childIsRendered', true);

      await render(hbs`
        {{#parent-component onInit=(action onInit 'parent')}}
          {{#if childIsRendered}}
            {{child-component onInit=(action onInit 'child')}}
          {{/if}}
        {{/parent-component}}
      `);

      const provider = this.parent.get('currentUser');
      td.replace(provider, 'destroy');

      this.set('childIsRendered', false);

      assert.verify(provider.destroy(), { times: 0, ignoreExtraArgs: true });

      await clearRender();

      assert.verify(provider.destroy());
    });

    test('accessing a provider from a child before the parent', async function(assert) {
      await render(hbs`
        {{#parent-component onInit=(action onInit 'parent')}}
          {{child-component onInit=(action onInit 'child')}}
        {{/parent-component}}
      `);

      const childCurrentUser = this.child.get('currentUser');
      assert.ok(childCurrentUser, 'Looked up an instance of the provider');

      const parentCurrentUser = this.parent.get('currentUser');
      assert.equal(
        childCurrentUser,
        parentCurrentUser,
        'The parent and child are referencing the same instance of the provider'
      );
    });

    test("finding an ancestor's provider", async function(assert) {
      await render(hbs`
        {{#parent-component onInit=(action onInit 'parent')}}
          {{#component-without-provider}}
            {{#component-without-provider}}
              {{#component-without-provider}}
                {{child-component onInit=(action onInit 'child')}}
              {{/component-without-provider}}
            {{/component-without-provider}}
          {{/component-without-provider}}
        {{/parent-component}}
      `);

      assert.equal(
        this.parent.get('currentUser'),
        this.child.get('currentUser'),
        'Child found the parent instance by walking up the tree'
      );
    });
  });
});
