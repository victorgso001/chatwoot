import { action } from '@storybook/addon-actions';
import SubjectDropdownItem from './SubjectDropdownItem';

export default {
  title: 'Components/Subject/Item',
  component: SubjectDropdownItem,
  argTypes: {
    title: {
      defaultValue: 'sales',
      control: {
        type: 'text',
      },
    },
    color: {
      defaultValue: '#555',
      control: {
        type: 'text',
      },
    },
    selected: {
      defaultValue: true,
      control: {
        type: 'boolean',
      },
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { SubjectDropdownItem },
  template:
    '<subject-dropdown-item v-bind="$props" @click="onClick"></subject-dropdown-item>',
});

export const Item = Template.bind({});
Item.args = {
  onClick: action('Selected'),
};
