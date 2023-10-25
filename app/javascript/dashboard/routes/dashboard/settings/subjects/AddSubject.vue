<template>
  <div class="h-auto overflow-auto flex flex-col">
    <woot-modal-header
      :header-title="$t('SUBJECT_MGMT.ADD.TITLE')"
      :header-content-value="$t('SUBJECT_MGMT.ADD.DESC')"
    />
    <form class="mx-0 flex flex-wrap" @submit.prevent="addSubject">
      <woot-input
        v-model.trim="title"
        :class="{ error: $v.title.$error }"
        class="w-full subject-name--input"
        :subject="$t('SUBJECT_MGMT.FORM.NAME.LABEL')"
        :placeholder="$t('SUBJECT_MGMT.FORM.NAME.PLACEHOLDER')"
        :error="getSubjectTitleErrorMessage"
        data-testid="subject-title"
        @input="$v.title.$touch"
      />

      <woot-input
        v-model.trim="description"
        :class="{ error: $v.description.$error }"
        class="w-full"
        :subject="$t('SUBJECT_MGMT.FORM.DESCRIPTION.LABEL')"
        :placeholder="$t('SUBJECT_MGMT.FORM.DESCRIPTION.PLACEHOLDER')"
        data-testid="subject-description"
        @input="$v.description.$touch"
      />

      <div class="w-full">
        <label>
          {{ $t('SUBJECT_MGMT.FORM.COLOR.LABEL') }}
          <woot-color-picker v-model="color" />
        </label>
      </div>
      <div class="w-full">
        <input v-model="showOnSidebar" type="checkbox" :value="true" />
        <label for="conversation_creation">
          {{ $t('SUBJECT_MGMT.FORM.SHOW_ON_SIDEBAR.LABEL') }}
        </label>
      </div>
      <div class="flex justify-end items-center py-2 px-0 gap-2 w-full">
        <woot-button
          :is-disabled="$v.title.$invalid || uiFlags.isCreating"
          :is-loading="uiFlags.isCreating"
          data-testid="subject-submit"
        >
          {{ $t('SUBJECT_MGMT.FORM.CREATE') }}
        </woot-button>
        <woot-button class="button clear" @click.prevent="onClose">
          {{ $t('SUBJECT_MGMT.FORM.CANCEL') }}
        </woot-button>
      </div>
    </form>
  </div>
</template>

<script>
import alertMixin from 'shared/mixins/alertMixin';
import validationMixin from './validationMixin';
import { mapGetters } from 'vuex';
import validations from './validations';
import { getRandomColor } from 'dashboard/helper/subjectColor';

export default {
  mixins: [alertMixin, validationMixin],
  props: {
    prefillTitle: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      color: '#000',
      description: '',
      title: '',
      showOnSidebar: true,
    };
  },
  validations,
  computed: {
    ...mapGetters({
      uiFlags: 'subjects/getUIFlags',
    }),
  },
  mounted() {
    this.color = getRandomColor();
    this.title = this.prefillTitle.toLowerCase();
  },
  methods: {
    onClose() {
      this.$emit('close');
    },
    async addSubject() {
      try {
        await this.$store.dispatch('subjects/create', {
          color: this.color,
          description: this.description,
          title: this.title.toLowerCase(),
          show_on_sidebar: this.showOnSidebar,
        });
        this.showAlert(this.$t('SUBJECT_MGMT.ADD.API.SUCCESS_MESSAGE'));
        this.onClose();
      } catch (error) {
        const errorMessage =
          error.message || this.$t('SUBJECT_MGMT.ADD.API.ERROR_MESSAGE');
        this.showAlert(errorMessage);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
// Subject API supports only lowercase letters
.subject-name--input {
  ::v-deep {
    input {
      @apply lowercase;
    }
  }
}
</style>
