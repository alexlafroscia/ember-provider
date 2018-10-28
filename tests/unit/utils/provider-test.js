import { module, test } from "qunit";
import { setupTest } from "ember-qunit";
import EmberObject from "@ember/object";
import { inject as provider } from "ember-data-provider";

const WithCurrentUser = EmberObject.extend({
  currentUser: provider("current-user")
});

module("Unit | Utility | provider", function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    this.owner.register("demo:current-user", WithCurrentUser, {
      singleton: false
    });
  });

  test("can inject a provider into an object", function(assert) {
    const obj = this.owner.lookup("demo:current-user");

    assert.deepEqual(obj.currentUser.fetch(), {
      name: "Alex"
    });
  });

  test("different objects get different instances of the provider", function(assert) {
    const obj1 = this.owner.lookup("demo:current-user");
    const obj2 = this.owner.lookup("demo:current-user");

    assert.notEqual(obj1.currentUser, obj2.currentUser);
  });
});
