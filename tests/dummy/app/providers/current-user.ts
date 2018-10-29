import { Provider } from "ember-provider";

export default class CurrentUserProvider extends Provider {
  fetch() {
    return { name: "Alex" };
  }
}

declare module "ember-provider" {
  interface Registry {
    "current-user": CurrentUserProvider;
  }
}
