<template>
  <woot-button
    variant="smooth"
    class="subject--add"
    icon="add"
    size="tiny"
    @click="addSubject"
  >
    {{ $t('CONTACT_PANEL.SUBJECTS.CONVERSATION.ADD_BUTTON') }}
  </woot-button>
</template>

<script>
export default {
  methods: {
    addSubject() {
      this.$emit('add');
    },
  },
};
</script>

<style lang="scss" scoped>
.subject--add {
  margin-bottom: var(--space-micro);
  margin-right: var(--space-micro);
}
</style>
