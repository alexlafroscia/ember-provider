import { computed } from "@ember/object";
import { getOwner } from "@ember/application";

export default function inject(identifier) {
  return computed(function() {
    const owner = getOwner(this);

    return owner.lookup(`provider:${identifier}`);
  });
}
