<template>
  <div v-on-clickaway="closeDropdownSubject" class="subject-wrap">
    <add-subject @add="toggleSubjects" />
    <woot-subject
      v-for="subject in savedSubjects"
      :key="subject.id"
      :title="subject.title"
      :description="subject.description"
      :show-close="true"
      :color="subject.color"
      variant="smooth"
      @click="removeItem"
    />
    <div class="dropdown-wrap">
      <div
        :class="{ 'dropdown-pane--open': showSearchDropdownSubject }"
        class="dropdown-pane"
      >
        <subject-dropdown
          v-if="showSearchDropdownSubject"
          :account-subjects="allSubjects"
          :selected-subjects="selectedSubjects"
          :allow-creation="isAdmin"
          @add="addItem"
          @remove="removeItem"
        />
      </div>
    </div>
  </div>
</template>

<script>
import AddSubject from 'shared/components/ui/dropdown/AddSubject.vue';
import eventListenerMixins from 'shared/mixins/eventListenerMixins';
import SubjectDropdown from 'shared/components/ui/subject/SubjectDropdown.vue';
import { mixin as clickaway } from 'vue-clickaway';
import adminMixin from 'dashboard/mixins/isAdmin';
import {
  buildHotKeys,
  isEscape,
  isActiveElementTypeable,
} from 'shared/helpers/KeyboardHelpers';

export default {
  components: {
    AddSubject,
    SubjectDropdown,
  },

  mixins: [clickaway, adminMixin, eventListenerMixins],

  props: {
    allSubjects: {
      type: Array,
      default: () => [],
    },
    savedSubjects: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      showSearchDropdownSubject: false,
    };
  },

  computed: {
    selectedSubjects() {
      return this.savedSubjects.map(subject => subject.title);
    },
  },

  methods: {
    addItem(subject) {
      this.$emit('add', subject);
    },

    removeItem(subject) {
      this.$emit('remove', subject);
    },

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
.title-icon {
  margin-right: var(--space-smaller);
}

.subject-wrap {
  position: relative;
  line-height: var(--space-medium);

  .dropdown-wrap {
    display: flex;
    position: absolute;
    margin-right: var(--space-medium);
    top: var(--space-medium);
    width: 100%;
    left: -1px;

    .dropdown-pane {
      width: 100%;
      box-sizing: border-box;
    }
  }
}
</style>
