import { module, test } from "qunit";
import { setupTest } from "ember-qunit";
import EmberObject from "@ember/object";
import { inject as provider } from "ember-provider";

const WithCurrentUser = EmberObject.extend({
  currentUser: provider("current-user")
});

module("Unit | Utility | provider", function(hooks) {
  setupTest(hooks);

  test("can inject a provider into an object", function(assert) {
    const obj = WithCurrentUser.create(this.owner.ownerInjection());

    assert.deepEqual(obj.get("currentUser").fetch(), {
      name: "Alex"
    });
  });

  test("different objects get different instances of the provider", function(assert) {
    const obj1 = WithCurrentUser.create(this.owner.ownerInjection());
    const obj2 = WithCurrentUser.create(this.owner.ownerInjection());

    assert.notEqual(obj1.get("currentUser"), obj2.get("currentUser"));
  });
});
