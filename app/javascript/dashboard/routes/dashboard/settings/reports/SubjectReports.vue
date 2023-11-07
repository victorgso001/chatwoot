<template>
  <woot-reports
    key="subject-reports"
    type="subject"
    getter-key="subjects/getSubjects"
    action-key="subjects/get"
    :download-button-label="$t('SUBJECT_REPORTS.DOWNLOAD_SUBJECT_REPORTS')"
  />
</template>

<script>
import WootReports from './components/WootReports.vue';

export default {
  components: {
    WootReports,
  },
};
</script>
