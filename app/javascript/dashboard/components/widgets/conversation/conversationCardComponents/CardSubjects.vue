<template>
  <div
    v-show="activeSubjects.length"
    ref="subjectContainer"
    class="subject-container mt-0.5 mx-2 mb-0"
  >
    <div
      class="subjects-wrap flex items-end min-w-0 flex-shrink"
      :class="{ expand: showAllSubjects }"
    >
      <woot-label
        v-for="(subject, index) in activeSubjects"
        :key="subject.id"
        :title="subject.title"
        :description="subject.description"
        :color="subject.color"
        variant="smooth"
        small
        :class="{ hidden: !showAllSubjects && index > subjectPosition }"
      />
      <woot-button
        v-if="showExpandSubjectButton"
        :title="
          showAllSubjects
            ? $t('CONVERSATION.CARD.HIDE_SUBJECTS')
            : $t('CONVERSATION.CARD.SHOW_SUBJECTS')
        "
        class="show-more--button sticky flex-shrink-0 right-0 mr-6 rtl:rotate-180"
        color-scheme="secondary"
        variant="hollow"
        :icon="showAllSubjects ? 'chevron-left' : 'chevron-right'"
        size="tiny"
        @click="onShowSubjects"
      />
    </div>
  </div>
</template>
<script>
import conversationSubjectMixin from 'dashboard/mixins/conversation/subjectMixin';
export default {
  mixins: [conversationSubjectMixin],
  props: {
    conversationId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      showAllSubjects: false,
      showExpandSubjectButton: false,
      subjectPosition: -1,
    };
  },
  watch: {
    activeSubjects() {
      this.$nextTick(() => this.computeVisibleSubjectPosition());
    },
  },
  mounted() {
    this.computeVisibleSubjectPosition();
  },
  methods: {
    onShowSubjects(e) {
      e.stopPropagation();
      this.showAllSubjects = !this.showAllSubjects;
    },
    computeVisibleSubjectPosition() {
      const subjectContainer = this.$refs.subjectContainer;
      const subjects = this.$refs.subjectContainer.querySelectorAll('.subject');
      let subjectOffset = 0;
      this.showExpandSubjectButton = false;

      Array.from(subjects).forEach((subject, index) => {
        subjectOffset += subject.offsetWidth + 8;

        if (subjectOffset < subjectContainer.clientWidth - 16) {
          this.subjectPosition = index;
        } else {
          this.showExpandSubjectButton = true;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.show-more--button {
  @apply h-5;
  &.secondary:focus {
    @apply text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-700;
  }
}

.subjects-wrap {
  &.expand {
    @apply h-auto overflow-visible flex-row flex-wrap;

    .label {
      @apply mb-1;
    }

    .show-more--button {
      @apply mb-1;
    }
  }

  .secondary {
    @apply border border-solid border-slate-100 dark:border-slate-700;
  }

  .label {
    @apply mb-0;
  }
}

.hidden {
  @apply invisible absolute;
}
</style>
