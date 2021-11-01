<template>
  <v-row>
    <v-col cols="12">
      <Orders v-on:update="update()" />
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: "Dashboard",
  data() {
    return {};
  },
  mounted() {
    this.socket = this.$nuxtSocket({
      name: "main",
      channel: "/",
      reconnection: false,
    });
    this.socket.on("new_order", (data) => {
      this.$toast.success(data.msg);
      this.$fetch()
    });
  },
  async fetch() {
    await this.$api.orders.getOrders();
  },
};
</script>
