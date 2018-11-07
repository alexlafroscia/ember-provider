import { Registry } from './index';
import ProviderInjection from './-private/provider-injection';

/**
 * Inject a Provider into a host object
 *
 * @param identifier the Provider's identifier on the registry
 * @param options
 */
export default function inject<K extends keyof Registry>(identifier: K) {
  return new ProviderInjection(identifier);
}
