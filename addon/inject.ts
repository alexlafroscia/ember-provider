import { computed } from "@ember/object";
import { getOwner } from "@ember/application";

import { Registry } from "./index";

export default function inject<K extends keyof Registry>(identifier: K) {
  return computed<Registry[K]>(function() {
    const owner = getOwner(this);

    return owner.lookup(`provider:${identifier}`);
  });
}
