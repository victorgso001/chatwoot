<template>
  <div class="flex flex-col w-full max-h-[12.5rem]">
    <div class="flex items-center justify-center mb-1">
      <h4
        class="text-sm text-slate-800 dark:text-slate-100 m-0 overflow-hidden whitespace-nowrap text-ellipsis flex-grow"
      >
        {{ $t('CONTACT_PANEL.SUBJECTS.SUBJECT_SELECT.TITLE') }}
      </h4>
      <hotkey
        custom-class="text-slate-800 dark:text-slate-100 bg-slate-50 dark:bg-slate-600 text-xxs border border-solid border-slate-75 dark:border-slate-600"
      >
        S
      </hotkey>
    </div>
    <div class="mb-2 flex-shrink-0 flex-grow-0 flex-auto max-h-8">
      <input
        ref="searchbar"
        v-model="search"
        type="text"
        class="search-input"
        autofocus="true"
        :placeholder="$t('CONTACT_PANEL.SUBJECTS.SUBJECT_SELECT.PLACEHOLDER')"
      />
    </div>
    <div
      class="flex justify-start items-start flex-grow flex-shrink flex-auto overflow-auto"
    >
      <div class="w-full">
        <woot-dropdown-menu>
          <subject-dropdown-item
            v-for="subject in filteredActiveSubjects"
            :key="subject.title"
            :title="subject.title"
            :color="subject.color"
            :selected="selectedSubjects.includes(subject.title)"
            @click="onAddRemove(subject)"
          />
        </woot-dropdown-menu>
        <div
          v-if="noResult"
          class="flex justify-center py-4 px-2.5 font-medium text-xs text-slate-700 dark:text-slate-200"
        >
          {{ $t('CONTACT_PANEL.SUBJECTS.SUBJECT_SELECT.NO_RESULT') }}
        </div>
        <div
          v-if="allowCreation && shouldShowCreate"
          class="flex pt-1 border-t border-solid border-slate-100 dark:border-slate-900"
        >
          <woot-button
            size="small"
            variant="clear"
            color-scheme="secondary"
            icon="add"
            is-expanded
            class="button-new-subject"
            :is-disabled="hasExactMatchInResults"
            @click="showCreateModal"
          >
            {{ createSubjectPlaceholder }}
            {{ parsedSearch }}
          </woot-button>

          <woot-modal
            :show.sync="createModalVisible"
            :on-close="hideCreateModal"
          >
            <add-subject-modal
              :prefill-title="parsedSearch"
              @close="hideCreateModal"
            />
          </woot-modal>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SubjectDropdownItem from './SubjectDropdownItem.vue';
import Hotkey from 'dashboard/components/base/Hotkey.vue';
import AddSubjectModal from 'dashboard/routes/dashboard/settings/subjects/AddSubject.vue';
import { picoSearch } from '@scmmishra/pico-search';
import { sanitizeLabel } from 'shared/helpers/sanitizeData';

export default {
  components: {
    SubjectDropdownItem,
    AddSubjectModal,
    Hotkey,
  },

  props: {
    accountSubjects: {
      type: Array,
      default: () => [],
    },
    selectedSubjects: {
      type: Array,
      default: () => [],
    },
    allowCreation: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      search: '',
      createModalVisible: false,
    };
  },

  computed: {
    createSubjectPlaceholder() {
      const subject = this.$t(
        'CONTACT_PANEL.SUBJECTS.SUBJECT_SELECT.CREATE_SUBJECT'
      );
      return this.search ? `${subject}:` : subject;
    },

    filteredActiveSubjects() {
      if (!this.search) return this.accountSubjects;

      return picoSearch(this.accountSubjects, this.search, ['title'], {
        threshold: 0.9,
      });
    },

    noResult() {
      return this.filteredActiveSubjects.length === 0;
    },

    hasExactMatchInResults() {
      return this.filteredActiveSubjects.some(
        subject => subject.title === this.search
      );
    },

    shouldShowCreate() {
      return this.allowCreation && this.filteredActiveSubjects.length < 3;
    },

    parsedSearch() {
      return sanitizeLabel(this.search);
    },
  },

  mounted() {
    this.focusInput();
  },

  methods: {
    focusInput() {
      this.$refs.searchbar.focus();
    },

    updateSubjects(subject) {
      this.$emit('update', subject);
    },

    onAdd(subject) {
      this.$emit('add', subject);
    },

    onRemove(subject) {
      this.$emit('remove', subject);
    },

    onAddRemove(subject) {
      if (this.selectedSubjects.includes(subject.title)) {
        this.onRemove(subject.title);
      } else {
        this.onAdd(subject);
      }
    },

    showCreateModal() {
      this.createModalVisible = true;
    },

    hideCreateModal() {
      this.createModalVisible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.hotkey {
  @apply flex-shrink-0;
}

.search-input {
  @apply m-0 w-full border border-solid border-transparent h-8 text-sm text-slate-700 dark:text-slate-100 rounded-md focus:border-woot-500 bg-slate-50 dark:bg-slate-900;
}

.button-new-subject {
  @apply whitespace-nowrap text-ellipsis overflow-hidden items-center;

  .icon {
    @apply min-w-0;
  }
}
</style>
