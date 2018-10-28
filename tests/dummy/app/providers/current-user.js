import { Provider } from "ember-data-provider";

export default class CurrentUserProvider extends Provider {
  fetch() {
    return { name: "Alex" };
  }
}
