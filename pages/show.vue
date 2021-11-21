<template>
  <div>
    <v-app-bar :clipped-left="true" fixed app> FOODEX System </v-app-bar>
    <v-main>
      <div id="main">
        <div id="pending">
          <v-chip
            v-for="order in filterPending"
            :key="order._id"
            color="orange"
            label
            large
            >{{
              order.number && order.number.toString().padStart(4, "0")
            }}</v-chip
          >
        </div>
        <div id="done">
          <v-chip
            v-for="order in filterSuccess"
            :key="order._id"
            color="green"
            label
            large
            >{{
              order.number && order.number.toString().padStart(4, "0")
            }}</v-chip
          >
        </div>
      </div>
    </v-main>
  </div>
</template>

<script>
export default {
  name: "ShowOders",
  layout: "auth",
  computed: {
    filterPending() {
      return this.$store.state.orders.orders.filter(
        (order) => order.status == false
      );
    },
    filterSuccess() {
      return this.$store.state.orders.orders.filter(
        (order) => order.status == true
      );
    },
  },
  async fetch() {
    await this.$api.orders.getOrders();
  },
};
</script>
<style scoped>
#main {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
#main > div {
  width: 50%;
  height: 100vh;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px
}
#pending {
  border-right: 2px solid lightgray;
}
</style>
