<template>
  <div>
    <v-card class="mb-10">
      <div class="d-flex align-center mx-5">
        <v-text-field
          class="mx-2"
          v-model="search"
          max-width="500"
          label="Search"
        ></v-text-field>
        <v-btn @click="search_foods" fab dark small color="primary">
          <v-icon> mdi-magnify </v-icon>
        </v-btn>
      </div>
    </v-card>
    <div style="gap: 10px" class="d-flex gap-5 flex-wrap justify-center">
      <FoodCard
        v-for="food in $store.state.foods.foods"
        :food="food"
        :key="food._id"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: "Foods",
  data() {
    return {
      search: "",
    };
  },
  methods: {
    search_foods() {
      alert(this.search);
    },
  },
  async fetch() {
    await this.$api.foods.getFoods();
  },
};
</script>
