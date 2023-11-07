import Vue from 'vue';
import * as types from '../mutation-types';
import ConversationAPI from '../../api/conversations';

const state = {
  records: {},
  uiFlags: {
    isFetching: false,
    isUpdating: false,
    isError: false,
  },
};

export const getters = {
  getUIFlags($state) {
    return $state.uiFlags;
  },
  getConversationSubjects: $state => id => {
    return $state.records[Number(id)] || [];
  },
};

export const actions = {
  get: async ({ commit }, conversationId) => {
    commit(types.default.SET_CONVERSATION_SUBJECTS_UI_FLAG, {
      isFetching: true,
    });
    try {
      const response = await ConversationAPI.getSubjects(conversationId);
      commit(types.default.SET_CONVERSATION_SUBJECTS, {
        id: conversationId,
        data: response.data.payload,
      });
      commit(types.default.SET_CONVERSATION_SUBJECTS_UI_FLAG, {
        isFetching: false,
      });
    } catch (error) {
      commit(types.default.SET_CONVERSATION_SUBJECTS_UI_FLAG, {
        isFetching: false,
      });
    }
  },
  update: async ({ commit }, { conversationId, subjects }) => {
    commit(types.default.SET_CONVERSATION_SUBJECTS_UI_FLAG, {
      isUpdating: true,
    });
    try {
      const response = await ConversationAPI.updateSubjects(
        conversationId,
        subjects
      );
      commit(types.default.SET_CONVERSATION_SUBJECTS, {
        id: conversationId,
        data: response.data.payload,
      });
      commit(types.default.SET_CONVERSATION_SUBJECTS_UI_FLAG, {
        isUpdating: false,
        isError: false,
      });
    } catch (error) {
      commit(types.default.SET_CONVERSATION_SUBJECTS_UI_FLAG, {
        isUpdating: false,
        isError: true,
      });
    }
  },
  setBulkConversationSubjects({ commit }, conversations) {
    commit(types.default.SET_BULK_CONVERSATION_SUBJECTS, conversations);
  },
  setConversationLabel({ commit }, { id, data }) {
    commit(types.default.SET_CONVERSATION_SUBJECTS, { id, data });
  },
};

export const mutations = {
  [types.default.SET_CONVERSATION_SUBJECTS_UI_FLAG]($state, data) {
    $state.uiFlags = {
      ...$state.uiFlags,
      ...data,
    };
  },
  [types.default.SET_CONVERSATION_SUBJECTS]: ($state, { id, data }) => {
    Vue.set($state.records, id, data);
  },
  [types.default.SET_BULK_CONVERSATION_SUBJECTS]: ($state, conversations) => {
    conversations.forEach(conversation => {
      Vue.set($state.records, conversation.id, conversation.subjects);
    });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
