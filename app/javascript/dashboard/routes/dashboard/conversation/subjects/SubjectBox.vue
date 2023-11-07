<template>
  <div class="sidebar-subjects-wrap">
    <div
      v-if="!conversationUiFlags.isFetching"
      class="contact-conversation--list"
    >
      <div
        v-on-clickaway="closeDropdownSubject"
        class="subject-wrap"
        @keyup.esc="closeDropdownSubject"
      >
        <add-subject @add="toggleSubjects" />
        <woot-label
          v-for="subject in activeSubjects"
          :key="subject.id"
          :title="subject.title"
          :description="subject.description"
          :show-close="true"
          :color="subject.color"
          variant="smooth"
          @click="removeSubjectFromConversation"
        />

        <div class="dropdown-wrap">
          <div
            :class="{ 'dropdown-pane--open': showSearchDropdownSubject }"
            class="dropdown-pane"
          >
            <subject-dropdown
              v-if="showSearchDropdownSubject"
              :account-subjects="accountSubjects"
              :selected-subjects="savedSubjects"
              :allow-creation="isAdmin"
              @add="addSubjectToConversation"
              @remove="removeSubjectFromConversation"
            />
          </div>
        </div>
      </div>
    </div>
    <spinner v-else />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Spinner from 'shared/components/Spinner.vue';
import SubjectDropdown from 'shared/components/ui/subject/SubjectDropdown.vue';
import AddSubject from 'shared/components/ui/dropdown/AddSubject.vue';
import { mixin as clickaway } from 'vue-clickaway';
import adminMixin from 'dashboard/mixins/isAdmin';
import eventListenerMixins from 'shared/mixins/eventListenerMixins';
import conversationSubjectMixin from 'dashboard/mixins/conversation/subjectMixin';
import {
  buildHotKeys,
  isEscape,
  isActiveElementTypeable,
} from 'shared/helpers/KeyboardHelpers';

export default {
  components: {
    Spinner,
    SubjectDropdown,
    AddSubject,
  },

  mixins: [
    clickaway,
    conversationSubjectMixin,
    adminMixin,
    eventListenerMixins,
  ],
  props: {
    conversationId: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      selectedSubjects: [],
      showSearchDropdownSubject: false,
    };
  },

  computed: {
    ...mapGetters({
      conversationUiFlags: 'conversationSubjects/getUIFlags',
      subjectUiFlags: 'conversationSubjects/getUIFlags',
    }),
  },
  methods: {
    toggleSubjects() {
      this.showSearchDropdownSubject = !this.showSearchDropdownSubject;
    },
    closeDropdownSubject() {
      this.showSearchDropdownSubject = false;
    },
    handleKeyEvents(e) {
      const keyPattern = buildHotKeys(e);

      if (keyPattern === 'l' && !isActiveElementTypeable(e)) {
        this.toggleSubjects();
        e.preventDefault();
      } else if (isEscape(e) && this.showSearchDropdownSubject) {
        this.closeDropdownSubject();
        e.preventDefault();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.sidebar-subjects-wrap {
  margin-bottom: 0;
}
.contact-conversation--list {
  width: 100%;

  .subject-wrap {
    line-height: var(--space-medium);
    position: relative;

    .dropdown-wrap {
      display: flex;
      left: -1px;
      margin-right: var(--space-medium);
      position: absolute;
      top: var(--space-medium);
      width: 100%;

      .dropdown-pane {
        width: 100%;
        box-sizing: border-box;
      }
    }
  }
}

.error {
  color: var(--r-500);
  font-size: var(--font-size-mini);
  font-weight: var(--font-weight-medium);
}
</style>
