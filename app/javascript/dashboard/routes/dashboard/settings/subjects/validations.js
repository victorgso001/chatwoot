import { required, minLength } from 'vuelidate/lib/validators';

export const validSubjectCharacters = (str = '') => !!str && !str.includes(' ');

export default {
  title: {
    required,
    minLength: minLength(2),
    validSubjectCharacters,
  },
  description: {},
  color: {
    required,
  },
  showOnSidebar: {},
};
