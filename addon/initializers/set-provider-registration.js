export function initialize(owner) {
  owner.registerOptionsForType("provider", {
    singleton: false
  });
}

export default {
  initialize
};
