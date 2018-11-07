import Provider from './provider';

export { default as inject } from './inject';
export { Provider };

export interface Registry {
  [prop: string]: Provider;
}
