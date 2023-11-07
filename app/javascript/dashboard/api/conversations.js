/* global axios */
import ApiClient from './ApiClient';

class ConversationApi extends ApiClient {
  constructor() {
    super('conversations', { accountScoped: true });
  }

  getLabels(conversationID) {
    return axios.get(`${this.url}/${conversationID}/labels`);
  }

  updateLabels(conversationID, labels) {
    return axios.post(`${this.url}/${conversationID}/labels`, { labels });
  }

  getSubjects(conversationID) {
    return axios.get(`${this.url}/${conversationID}/subjects`);
  }

  updateSubjects(conversationID, subjects) {
    return axios.post(`${this.url}/${conversationID}/subjects`, { subjects });
  }
}

export default new ConversationApi();
