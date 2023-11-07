<template>
  <div :class="subjectClass" :style="subjectStyle" :title="description">
    <span v-if="icon" class="subject-action--button">
      <fluent-icon
        :icon="icon"
        size="12"
        class="subject--icon cursor-pointer"
      />
    </span>
    <span
      v-if="['smooth', 'dashed'].includes(variant) && title && !icon"
      :style="{ background: color }"
      class="subject-color-dot"
    />
    <span v-if="!href">{{ title }}</span>
    <a v-else :href="href" :style="anchorStyle">{{ title }}</a>
    <button
      v-if="showClose"
      class="subject-close--button"
      :style="{ color: textColor }"
      @click="onClick"
    >
      <fluent-icon icon="dismiss" size="12" class="close--icon" />
    </button>
  </div>
</template>
<script>
import { getContrastingTextColor } from '@chatwoot/utils';

export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    href: {
      type: String,
      default: '',
    },
    bgColor: {
      type: String,
      default: '',
    },
    small: {
      type: Boolean,
      default: false,
    },
    showClose: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: '',
    },
    colorScheme: {
      type: String,
      default: '',
    },
    variant: {
      type: String,
      default: '',
    },
  },
  computed: {
    textColor() {
      if (this.variant === 'smooth') return '';
      if (this.variant === 'dashed') return '';
      return this.color || getContrastingTextColor(this.bgColor);
    },
    subjectClass() {
      return `subject ${this.colorScheme} ${this.variant} ${
        this.small ? 'small' : ''
      }`;
    },
    subjectStyle() {
      if (this.bgColor) {
        return {
          background: this.bgColor,
          color: this.textColor,
          border: `1px solid ${this.bgColor}`,
        };
      }
      return {};
    },
    anchorStyle() {
      if (this.bgColor) {
        return { color: this.textColor };
      }
      return {};
    },
  },
  methods: {
    onClick() {
      this.$emit('click', this.title);
    },
  },
};
</script>

<style scoped lang="scss">
.subject {
  @apply inline-flex items-center font-medium gap-1 mr-1 rtl:ml-1 rtl:mr-0 mb-1 p-1 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-100 border border-solid border-slate-75 dark:border-slate-600 h-6;

  &.small {
    @apply text-xs py-0.5 px-1 leading-tight h-5;
  }

  &.small .subject--icon,
  &.small .close--icon {
    @apply text-[0.5rem];
  }

  a {
    @apply text-xs;
    &:hover {
      @apply underline;
    }
  }

  /* Color Schemes */
  &.primary {
    @apply bg-woot-100 dark:bg-woot-100 text-woot-900 dark:text-woot-900 border border-solid border-woot-200;

    a {
      @apply text-woot-900 dark:text-woot-900;
    }
    .subject-color-dot {
      @apply bg-woot-600 dark:bg-woot-600;
    }
  }
  &.secondary {
    @apply bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100 border border-solid border-slate-200 dark:border-slate-600;

    a {
      @apply text-slate-900 dark:text-slate-100;
    }
    .subject-color-dot {
      @apply bg-slate-600 dark:bg-slate-600;
    }
  }
  &.success {
    @apply bg-green-100 dark:bg-green-700 text-green-900 dark:text-green-100 border border-solid border-green-200 dark:border-green-600;

    a {
      @apply text-green-900 dark:text-green-100;
    }
    .subject-color-dot {
      @apply bg-green-600 dark:bg-green-600;
    }
  }
  &.alert {
    @apply bg-red-100 dark:bg-red-700 text-red-900 dark:text-red-100 border border-solid border-red-200 dark:border-red-600;

    a {
      @apply text-red-900 dark:text-red-100;
    }
    .subject-color-dot {
      @apply bg-red-600 dark:bg-red-600;
    }
  }
  &.warning {
    @apply bg-yellow-100 dark:bg-yellow-700 text-yellow-900 dark:text-yellow-100 border border-solid border-yellow-200 dark:border-yellow-600;

    a {
      @apply text-yellow-900 dark:text-yellow-100;
    }
    .subject-color-dot {
      @apply bg-yellow-900 dark:bg-yellow-900;
    }
  }

  &.smooth {
    @apply bg-transparent text-slate-700 dark:text-slate-100 border border-solid border-slate-100 dark:border-slate-700;
  }

  &.dashed {
    @apply bg-transparent text-slate-700 dark:text-slate-100 border border-dashed border-slate-100 dark:border-slate-700;
  }
}

.subject-close--button {
  @apply text-slate-800 dark:text-slate-100 -mb-0.5 rounded-sm cursor-pointer flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-700;
}

.subject-action--button {
  @apply flex mr-1;
}

.subject-color-dot {
  @apply inline-block w-3 h-3 rounded-sm shadow-sm;
}
.subject.small .subject-color-dot {
  @apply w-2 h-2 rounded-sm shadow-sm;
}
</style>
