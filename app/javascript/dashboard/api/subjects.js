import CacheEnabledApiClient from './CacheEnabledApiClient';

class SubjectsAPI extends CacheEnabledApiClient {
  constructor() {
    super('subjects', { accountScoped: true });
  }

  // eslint-disable-next-line class-methods-use-this
  get cacheModelName() {
    return 'subject';
  }
}

export default new SubjectsAPI();
