<template>
  <v-card max-width="380">
    <v-img height="250" width="350" :src="$constants.url + food.photo"></v-img>
    <v-card-title>{{ food.name }}</v-card-title>
    <v-card-text>
      <v-row align="center" class="mx-0">
        <v-rating
          :value="4.5"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating>

        <div class="grey--text ms-4">4.5 (413)</div>
      </v-row>

      <div class="my-4 text-subtitle-1">$ • {{ food.price }} sum</div>
    </v-card-text>

    <v-divider class="mx-2"></v-divider>

    <v-card-actions>
      <v-btn
        @click="show_clients({ id: food._id, has: !food.has })"
        :color="food.has ? 'red' : 'green'"
      >
        {{ food.has ? "Don't have" : "Have" }}
      </v-btn>
      <v-spacer />
      <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">
            Details
          </v-btn>
        </template>

        <v-card>
          <v-card-title class="text-h5">
            {{ food.name }}
          </v-card-title>

          <v-card-text>
            <v-form ref="form" lazy-validation>
              <v-text-field
                v-model="name"
                label="Food name"
                required
              ></v-text-field>
              <v-text-field
                label="Food price"
                v-model="price"
                prefix="$"
              ></v-text-field>
            </v-form>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialog = false">
              I accept
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "FoodCard",
  props: {
    food: Object,
  },
  data() {
    return {
      name: this.food.name,
      price: this.food.price,
      dialog: false,
    };
  },
  methods: {
    async show_clients(data) {
      await this.$api.foods.has_food(data);
      await this.$api.foods.getFoods();
    },
  }
};
</script>
