import CacheEnabledApiClient from './CacheEnabledApiClient';

class SubjectsAPI extends CacheEnabledApiClient {
  constructor() {
    super('subjects', { accountScoped: true });
  }

  // eslint-disable-next-line class-methods-use-this
  get cacheModelName() {
    return 'subjects';
  }
}

export default new SubjectsAPI();
