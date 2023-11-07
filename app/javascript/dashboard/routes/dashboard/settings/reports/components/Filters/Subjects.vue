<template>
  <div class="multiselect-wrap--small">
    <multiselect
      v-model="selectedOption"
      class="no-margin"
      :placeholder="$t('SUBJECT_REPORTS.FILTER_DROPDOWN_SUBJECT')"
      label="title"
      track-by="id"
      :options="options"
      :option-height="24"
      :show-subjects="false"
      @input="handleInput"
    >
      <template slot="singleSubject" slot-scope="props">
        <div class="reports-option__wrap">
          <div
            :style="{ backgroundColor: props.option.color }"
            class="reports-option__rounded--item"
          />
          <span class="reports-option__desc">
            <span class="reports-option__title">
              {{ props.option.title }}
            </span>
          </span>
        </div>
      </template>
      <template slot="option" slot-scope="props">
        <div class="reports-option__wrap">
          <div
            :style="{ backgroundColor: props.option.color }"
            class="reports-option__rounded--item reports-option__item reports-option__label--swatch"
          />
          <span class="reports-option__desc">
            <span class="reports-option__title">
              {{ props.option.title }}
            </span>
          </span>
        </div>
      </template>
    </multiselect>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  name: 'ReportsFiltersSubjects',
  data() {
    return {
      selectedOption: null,
    };
  },
  computed: {
    ...mapGetters({
      options: 'subjects/getSubjects',
    }),
  },
  mounted() {
    this.$store.dispatch('subjects/get');
  },
  methods: {
    handleInput() {
      this.$emit('subjects-filter-selection', this.selectedOption);
    },
  },
};
</script>
