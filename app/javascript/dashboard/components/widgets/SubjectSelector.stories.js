import { action } from '@storybook/addon-actions';
import SubjectSelector from './SubjectSelector';

export default {
  title: 'Components/Subject/Contact Subject',
  component: SubjectSelector,
  argTypes: {
    contactId: {
      control: {
        type: 'text ,number',
      },
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { SubjectSelector },
  template:
    '<subject-selector v-bind="$props" @add="onAdd" @remove="onRemove"></subject-selector>',
});

export const ContactSubject = Template.bind({});
ContactSubject.args = {
  onAdd: action('Added'),
  onRemove: action('Removed'),
  allSubjects: [
    {
      id: '1',
      title: 'sales',
      description: '',
      color: '#0a5dd1',
    },
    {
      id: '2',
      title: 'refund',
      description: '',
      color: '#8442f5',
    },
    {
      id: '3',
      title: 'testing',
      description: '',
      color: '#f542f5',
    },
    {
      id: '4',
      title: 'scheduled',
      description: '',
      color: '#42d1f5',
    },
  ],
  savedSubjects: [
    {
      id: '2',
      title: 'refund',
      description: '',
      color: '#8442f5',
    },
    {
      id: '4',
      title: 'scheduled',
      description: '',
      color: '#42d1f5',
    },
  ],
};
