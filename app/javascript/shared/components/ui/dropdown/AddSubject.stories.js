import { action } from '@storybook/addon-actions';
import AddSubject from './AddSubject';

export default {
  title: 'Components/Subject/Add Button',
  component: AddSubject,
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { AddSubject },
  template: '<add-subject v-bind="$props" @add="onClick"></add-subject>',
});

export const AddButton = Template.bind({});
AddButton.args = {
  onClick: action('opened'),
};
