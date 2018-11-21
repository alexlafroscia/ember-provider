import { Provider } from 'ember-provider';

export default class <%= classifiedModuleName %> extends Provider {}

// DO NOT DELETE: this is how TypeScript knows how to look up your providers
declare module 'ember-provider' {
  interface Registry {
    '<%= dasherizedModuleName %>': <%= classifiedModuleName %>;
  }
}
