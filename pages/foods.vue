<template>
  <div>
    <v-expansion-panels class="mb-5">
      <v-expansion-panel>
        <v-expansion-panel-header>
          <h3>Add New Food</h3>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <AddFood />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <!-- <v-card class="mb-10">
      <v-card-text> </v-card-text>
    </v-card> -->
    <v-row>
      <FoodCard
        v-for="food in $store.state.foods.foods"
        :food="food"
        :key="food._id"
      />
    </v-row>
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
  created() {
    this.$fetch();
  },
  methods: {
    search_foods() {
      alert(this.search);
    },
  },
  async fetch() {
    await this.$api.foods.getFoods();
    await this.$api.foods.getFoodTypes();
  },
};
</script>
