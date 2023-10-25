export default {
  computed: {
    getSubjectTitleErrorMessage() {
      let errorMessage = '';
      if (!this.$v.title.$error) {
        errorMessage = '';
      } else if (!this.$v.title.required) {
        errorMessage = this.$t('SUBJECT_MGMT.FORM.NAME.REQUIRED_ERROR');
      } else if (!this.$v.title.minLength) {
        errorMessage = this.$t('SUBJECT_MGMT.FORM.NAME.MINIMUM_LENGTH_ERROR');
      } else if (!this.$v.title.validSubjectlCharacters) {
        errorMessage = this.$t('SUBJECT_MGMT.FORM.NAME.VALID_ERROR');
      }
      return errorMessage;
    },
  },
};
