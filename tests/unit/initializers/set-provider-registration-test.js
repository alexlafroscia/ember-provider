import Application from "@ember/application";

import { initialize } from "dummy/initializers/set-provider-registration";
import { module, test } from "qunit";
import { setupTest } from "ember-qunit";
import { run } from "@ember/runloop";

module("Unit | Initializer | set-provider-registration", function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    this.TestApplication = Application.extend();
    this.TestApplication.initializer({
      name: "initializer under test",
      initialize
    });

    this.application = this.TestApplication.create({ autoboot: false });
  });

  hooks.afterEach(function() {
    run(this.application, "destroy");
  });

  test("providers are created on lookup", async function(assert) {
    await this.application.boot();

    assert.deepEqual(this.application.registeredOptionsForType("provider"), {
      singleton: false
    });
  });
});
