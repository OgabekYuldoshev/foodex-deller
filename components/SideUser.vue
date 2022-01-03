<template>
  <div
    style="height: 100vh"
    class="w-full py-8 px-2 d-flex flex-column align-space-between"
  >
    <h2>hello</h2>
    <v-spacer />
    <v-btn color="red" @click="logOut"> Log Out </v-btn>
  </div>
</template>

<script>
export default {
  methods: {
    async logOut() {
      this.$toast.show("Logging Out...");
      await this.$auth.logout();
      this.$router.push("/login");
      this.$toast.success("Logged Out!");
    },
  },
};
</script>
