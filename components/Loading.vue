<template>
  <div class="d-flex align-center justify-center my-5">
    <v-progress-circular
      indeterminate
      size="64"
      width="5"
      color="primary"
    ></v-progress-circular>
  </div>
</template>

<script>
export default {
  props: {
    value: Boolean,
  },
};
</script>
