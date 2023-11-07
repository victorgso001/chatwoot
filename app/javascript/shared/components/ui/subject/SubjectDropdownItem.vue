<template>
  <woot-dropdown-item>
    <div class="item-wrap">
      <woot-button variant="clear" @click="onClick">
        <div class="button-wrap">
          <div class="name-subject-wrap">
            <div
              v-if="color"
              class="subject-color--display"
              :style="{ backgroundColor: color }"
            />
            <span class="subject-text" :title="title">{{ title }}</span>
          </div>
          <div>
            <i v-if="selected" class="icon ion-checkmark-round" />
          </div>
        </div>
      </woot-button>
    </div>
  </woot-dropdown-item>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: '',
    },
    selected: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    onClick() {
      this.$emit('click', this.title);
    },
  },
};
</script>

<style lang="scss" scoped>
.item-wrap {
  @apply flex;

  ::v-deep .button__content {
    @apply w-full;
  }

  .button-wrap {
    @apply flex justify-between w-full;

    &.active {
      @apply flex font-semibold text-woot-700 dark:text-woot-600;
    }

    .name-subject-wrap {
      @apply flex min-w-0 w-full;

      .subject-color--display {
        @apply mr-2 rtl:mr-0 rtl:ml-2;
      }

      .subject-text {
        @apply overflow-hidden text-ellipsis whitespace-nowrap leading-[1.1] pr-2;
      }

      .icon {
        @apply text-sm;
      }
    }
  }

  .subject-color--display {
    @apply rounded-md h-3 mr-1 rtl:mr-0 rtl:ml-1 mt-0.5 min-w-[0.75rem] w-3 border border-solid border-slate-50 dark:border-slate-600;
  }
}
</style>
