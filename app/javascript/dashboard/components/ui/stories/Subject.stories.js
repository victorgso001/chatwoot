import { action } from '@storybook/addon-actions';

export default {
  title: 'Components/Subject',
  argTypes: {
    title: {
      defaultValue: 'sales',
      control: {
        type: 'text',
      },
    },
    colorScheme: {
      control: {
        type: 'select',
        options: ['primary', 'secondary', 'success', 'alert', 'warning'],
      },
    },
    description: {
      defaultValue: 'subject',
      control: {
        type: 'text',
      },
    },
    href: {
      control: {
        type: 'text',
      },
    },
    bgColor: {
      defaultValue: '#a83262',
      control: {
        type: 'text',
      },
    },
    small: {
      defaultValue: false,
      control: {
        type: 'boolean',
      },
    },
    showClose: {
      defaultValue: false,
      control: {
        type: 'boolean',
      },
    },
    icon: {
      defaultValue: 'ion-close',
      control: {
        type: 'text',
      },
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<woot-subject v-bind="$props" @click="onClick"></woot-subject>',
});

export const DefaultSubject = Template.bind({});
DefaultSubject.args = {
  onClick: action('clicked'),
};
