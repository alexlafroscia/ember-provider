# ember-provider

Decouple data fetching from components, without requiring global state

## Installation

```bash
ember install ember-provider
```

## Why use this?

In the application I am building for work, we need to re-use a number of presentational components that fetch data differently. We started with the [presenter and container](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0) pattern but I wondered if there was a different, more "Ember"-esque way of separating the concerns of fetching and presenting data.

Ember's dependency injection system is really powerful and allows for a different approach for decoupling the fetching and presenting of data. Ember's Services already allow for this, but their global nature means that different instances of the same component would potentially share state.

`ember-provider` adds a new type of Service that can be interacted with the same way, but that will be unique to each component and destroyed when the component is destroyed.

## Usage

### Defining a Provider

To start, you can generate a Provider using provided generator, giving it a name like you would a Service

```bash
ember g provider load-data
```

This will create a new class, extending the `Provider` class from the addon. You can define it like you would any other Ember object, including adding things like Computed Properties and Ember Concurrency tasks.

```javascript
// app/providers/load-data.js
import { Provider } from 'ember-provider';
import { task } from 'ember-concurrency';

export default Provider.extend({
  fetch: task(function*() {
    const result = yield fetch('/api/whatever');
    return yield result.json();
  })
});
```

### Consuming the Provider

To add a Provider to one of your components, you can import the `inject` method and use it like you would the method from `@ember/service`

```javascript
import Component from '@ember/component';
import { inject as provider } from 'ember-provider';

export default Component.extend({
  loadData: provider('load-data'),

  didInsertElement() {
    this.get('loadData.fetch').perform();
  }
});
```

Alternatively, if you want to inject a provider into an ES6-style class, you can combine `inject` with a utility from `@ember-decorators/object` to create a decorator for `ember-provider`

```javascript
import Component from '@ember/component';
import { inject as providerComputed } from 'ember-provider';
import { macro } from '@ember-decorators/object/computed';

const provider = macro(providerComputed);

export default class extends Component {
  @provider('load-data')
  loadData;

  didInsertElement() {
    this.get('loadData.fetch').perform();
  }
}
```

## Contributing

### Installation

- `git clone <repository-url>`
- `cd ember-provider`
- `yarn install`

### Linting

- `yarn lint:hbs`
- `yarn lint:js`
- `yarn lint:js --fix`

### Running tests

- `ember test` – Runs the test suite on the current Ember version
- `ember test --server` – Runs the test suite in "watch mode"
- `ember try:each` – Runs the test suite against multiple Ember versions

### Running the dummy application

- `ember serve`
- Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

## License

This project is licensed under the [MIT License](LICENSE.md).
