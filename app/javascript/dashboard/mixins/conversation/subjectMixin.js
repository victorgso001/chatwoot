import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({ accountSubjects: 'subjects/getSubjects' }),
    savedSubjects() {
      return this.$store.getters[
        'conversationSubjects/getConversationSubjects'
      ](this.conversationId);
    },
    activeSubjects() {
      return this.accountSubjects.filter(({ title }) =>
        this.savedSubjects.includes(title)
      );
    },
    inactiveSubjects() {
      return this.accountSubjects.filter(
        ({ title }) => !this.savedSubjects.includes(title)
      );
    },
  },
  methods: {
    addSubjectToConversation(value) {
      const result = this.activeSubjects.map(item => item.title);
      result.push(value.title);
      this.onUpdateSubjects(result);
    },
    removeSubjectFromConversation(value) {
      const result = this.activeSubjects
        .map(subject => subject.title)
        .filter(subject => subject !== value);
      this.onUpdateSubjects(result);
    },
    async onUpdateSubjects(selectedSubjects) {
      this.$store.dispatch('conversationSubjects/update', {
        conversationId: this.conversationId,
        subjects: selectedSubjects,
      });
    },
  },
};
