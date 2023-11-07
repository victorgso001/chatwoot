<template>
  <li
    v-if="shouldShowSuggestions"
    class="subject-suggestion right"
    @mouseover="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <div class="wrap">
      <div class="subject-suggestion--container">
        <h6 class="subject-suggestion--title">Suggested subjects</h6>
        <div class="subject-suggestion--options">
          <button
            v-for="subject in preparedSubjects"
            :key="subject.title"
            v-tooltip.top="{
              content: selectedSubjects.includes(subject.title)
                ? $t('SUBJECT_MGMT.SUGGESTIONS.TOOLTIP.DESELECT')
                : subjectTooltip,
              delay: { show: 600, hide: 0 },
              hideOnClick: true,
            }"
            class="subject-suggestion--option"
            @click="pushOrAddSubject(subject.title)"
          >
            <woot-label
              variant="dashed"
              v-bind="subject"
              :bg-color="
                selectedSubjects.includes(subject.title) ? 'var(--w-100)' : ''
              "
            />
          </button>
          <woot-button
            v-if="preparedSubjects.length === 1"
            v-tooltip.top="{
              content: $t('SUBJECT_MGMT.SUGGESTIONS.TOOLTIP.DISMISS'),
              delay: { show: 600, hide: 0 },
              hideOnClick: true,
            }"
            variant="smooth"
            :color-scheme="isHovered ? 'alert' : 'primary'"
            class="label--add"
            icon="dismiss"
            size="tiny"
            @click="dismissSuggestions"
          />
        </div>
        <div v-if="preparedSubjects.length > 1">
          <woot-button
            :variant="selectedSubjects.length === 0 ? 'smooth' : ''"
            class="label--add"
            icon="add"
            size="tiny"
            @click="addAllSubjects"
          >
            {{ addButtonText }}
          </woot-button>
          <woot-button
            v-tooltip.top="{
              content: $t('SUBJECT_MGMT.SUGGESTIONS.TOOLTIP.DISMISS'),
              delay: { show: 600, hide: 0 },
              hideOnClick: true,
            }"
            :color-scheme="isHovered ? 'alert' : 'primary'"
            variant="smooth"
            class="label--add"
            icon="dismiss"
            size="tiny"
            @click="dismissSuggestions"
          />
        </div>
      </div>
      <div class="sender--info has-tooltip" data-original-title="null">
        <woot-thumbnail
          v-tooltip.top="{
            content: $t('SUBJECT_MGMT.SUGGESTIONS.POWERED_BY'),
            delay: { show: 600, hide: 0 },
            hideOnClick: true,
          }"
          size="16px"
        >
          <avatar class="user-thumbnail thumbnail-rounded">
            <fluent-icon class="chatwoot-ai-icon" icon="chatwoot-ai" />
          </avatar>
        </woot-thumbnail>
      </div>
    </div>
  </li>
</template>

<script>
// components
import WootButton from '../../../ui/WootButton.vue';
import Avatar from '../../Avatar.vue';
import aiMixin from 'dashboard/mixins/aiMixin';

// store & api
import { mapGetters } from 'vuex';

// utils & constants
import { LocalStorage } from 'shared/helpers/localStorage';
import { LOCAL_STORAGE_KEYS } from 'dashboard/constants/localStorage';
import { OPEN_AI_EVENTS } from '../../../../helper/AnalyticsHelper/events';

export default {
  name: 'SubjectSuggestion',
  components: {
    Avatar,
    WootButton,
  },
  mixins: [aiMixin],
  props: {
    suggestedSubjects: {
      type: Array,
      required: true,
    },
    chatSubjects: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  data() {
    return {
      isDismissed: false,
      isHovered: false,
      selectedSubjects: [],
    };
  },
  computed: {
    ...mapGetters({
      allSubjects: 'subjects/getSubjects',
      currentAccountId: 'getCurrentAccountId',
    }),
    subjectTooltip() {
      if (this.preparedSubjects.length > 1) {
        return this.$t('SUBJECT_MGMT.SUGGESTIONS.TOOLTIP.MULTIPLE_SUGGESTION');
      }

      return this.$t('SUBJECT_MGMT.SUGGESTIONS.TOOLTIP.SINGLE_SUGGESTION');
    },
    addButtonText() {
      if (this.selectedSubjects.length === 1) {
        return this.$t('SUBJECT_MGMT.SUGGESTIONS.ADD_SELECTED_SUBJECT');
      }

      if (this.selectedSubjects.length > 1) {
        return this.$t('SUBJECT_MGMT.SUGGESTIONS.ADD_SELECTED_SUBJECTS');
      }

      return this.$t('SUBJECT_MGMT.SUGGESTIONS.ADD_ALL_SUBJECTS');
    },
    preparedSubjects() {
      return this.allSubjects.filter(subject =>
        this.suggestedSubjects.includes(subject.title)
      );
    },
    shouldShowSuggestions() {
      if (this.isDismissed) return false;
      if (!this.isAIIntegrationEnabled) return false;

      return this.preparedSubjects.length && this.chatSubjects.length === 0;
    },
  },
  watch: {
    conversationId: {
      immediate: true,
      handler() {
        this.selectedSubjects = [];
        this.isDismissed = this.isConversationDismissed();
      },
    },
  },
  methods: {
    pushOrAddSubject(subject) {
      if (this.preparedSubjects.length === 1) {
        this.addAllSubjects();
        return;
      }

      if (!this.selectedSubjects.includes(subject)) {
        this.selectedSubjects.push(subject);
      } else {
        this.selectedSubjects = this.selectedSubjects.filter(
          l => l !== subject
        );
      }
    },
    dismissSuggestions() {
      LocalStorage.setFlag(
        LOCAL_STORAGE_KEYS.DISMISSED_SUBJECT_SUGGESTIONS,
        this.currentAccountId,
        this.conversationId
      );

      // dismiss this once the values are set
      this.isDismissed = true;
      this.trackSubjectEvent(OPEN_AI_EVENTS.DISMISS_SUBJECT_SUGGESTION);
    },
    isConversationDismissed() {
      return LocalStorage.getFlag(
        LOCAL_STORAGE_KEYS.DISMISSED_SUBJECT_SUGGESTIONS,
        this.currentAccountId,
        this.conversationId
      );
    },
    addAllSubjects() {
      let subjectsToAdd = this.selectedSubjects;
      if (!subjectsToAdd.length) {
        subjectsToAdd = this.preparedSubjects.map(subject => subject.title);
      }
      this.$store.dispatch('conversationSubjects/update', {
        conversationId: this.conversationId,
        subjects: subjectsToAdd,
      });
      this.trackSubjectEvent(OPEN_AI_EVENTS.APPLY_SUBJECT_SUGGESTION);
    },
    trackSubjectEvent(event) {
      const payload = {
        conversationId: this.conversationId,
        account: this.currentAccountId,
        suggestions: this.suggestedSubjects,
        subjectsApplied: this.selectedSubjects.length
          ? this.selectedSubjects
          : this.suggestedSubjects,
      };

      this.$track(event, payload);
    },
  },
};
</script>

<style scoped lang="scss">
.wrap {
  display: flex;
}

.subject-suggestion {
  flex-direction: row;
  justify-content: flex-end;
  margin-top: var(--space-normal);

  .subject-suggestion--container {
    max-width: 300px;
  }

  .subject-suggestion--options {
    text-align: right;
    display: flex;
    align-items: center;
    gap: var(--space-micro);

    button.subject-suggestion--option {
      .subject {
        cursor: pointer;
        margin-bottom: 0;
      }
    }
  }

  .chatwoot-ai-icon {
    height: var(--font-size-mini);
    width: var(--font-size-mini);
  }

  .subject-suggestion--title {
    color: var(--b-600);
    margin-top: var(--space-micro);
    font-size: var(--font-size-micro);
  }
}
</style>
