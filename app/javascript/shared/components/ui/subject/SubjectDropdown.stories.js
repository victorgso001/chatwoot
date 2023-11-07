import { action } from '@storybook/addon-actions';
import SubjectDropdown from './SubjectDropdown';

export default {
  title: 'Components/Subject/Dropdown',
  component: SubjectDropdown,
  argTypes: {
    conversationId: {
      control: {
        type: 'text',
      },
    },
    accountSubjects: {
      defaultValue: [
        {
          color: '#555',
          description: '',
          id: 1,
          title: 'sales',
        },
        {
          color: '#c242f5',
          description: '',
          id: 1,
          title: 'business',
        },
        {
          color: '#4287f5',
          description: '',
          id: 1,
          title: 'testing',
        },
      ],
      control: {
        type: 'object',
      },
    },
    selectedSubjects: {
      defaultValue: 'sales, testing',
      control: {
        type: 'object',
      },
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { SubjectDropdown },
  template:
    '<subject-dropdown v-bind="$props" @add="onAdd" @remove="onRemove"></subject-dropdown>',
});

export const Dropdown = Template.bind({});
Dropdown.args = {
  onAdd: action('added'),
  onRemove: action('removed'),
};
