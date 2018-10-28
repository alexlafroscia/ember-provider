import Application from "@ember/application";

export function initialize(owner: Application) {
  owner.registerOptionsForType("provider", {
    singleton: false
  });
}

export default {
  initialize
};
