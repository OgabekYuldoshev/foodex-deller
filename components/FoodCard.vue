<template>
  <v-col cols="12" sm="1" md="3">
    <v-card>
      <v-img height="250" :src="$constants.url + food.photo"></v-img>
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
          {{ food.has ? "Remove Menu" : "Add Menu" }}
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
                <div class="d-flex justify-space-between align-end mb-5">
                  <v-img
                    max-height="150"
                    max-width="150"
                    :lazy-src="$constants.url + food.photo"
                    :src="$constants.url + food.photo"
                    aspect-ratio="2"
                  >
                    <template v-slot:placeholder>
                      <v-row
                        class="fill-height ma-0"
                        align="center"
                        justify="center"
                      >
                        <v-progress-circular
                          indeterminate
                          color="grey lighten-5"
                        ></v-progress-circular>
                      </v-row>
                    </template>
                  </v-img>
                  <v-file-input
                    :rules="photoRules"
                    @change="selectFile"
                    accept="image/png, image/jpeg, image/jpg"
                    placeholder="Pick an photo"
                    prepend-icon="mdi-paperclip"
                    label="Photo"
                    required
                  ></v-file-input>
                </div>
                <v-text-field
                  v-model="name"
                  :rules="nameRules"
                  label="Food name"
                  required
                ></v-text-field>
                <v-select
                  v-model="type"
                  :items="$store.state.foods.types"
                  :rules="[(v) => !!v || 'Item is required']"
                  label="Type"
                  item-text="name"
                  item-value="_id"
                  required
                >
                  <template v-slot:item="{ item }">
                    {{ item.name }}
                  </template>
                </v-select>
                <v-text-field
                  label="Food price"
                  :rules="priceRules"
                  v-model="price"
                  prefix="$"
                ></v-text-field>
              </v-form>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="error" text @click="deleteFood()"> Delete </v-btn>
              <v-btn color="primary" text @click="validate"> Update </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card-actions>
    </v-card>
  </v-col>
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
      type: this.food.type._id,
      dialog: false,
      valid: true,
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => (v && v.length <= 30) || "Name must be less than 30 characters",
      ],

      priceRules: [
        (v) => !!v || "Price is required",
        (v) => (v && v.length <= 10) || "Price must be under than 0 characters",
      ],
      photo: "",
      photoRules: [
        (value) =>
          !value ||
          value.size < 2000000 ||
          "Avatar size should be less than 2 MB!",
      ],
    };
  },
  methods: {
    async show_clients(data) {
      await this.$api.foods.has_food(data);
      this.$fetch();
    },
    selectFile(event) {
      this.photo = event;
    },
    async validate() {
      this.$refs.form.validate();
      var formData = new FormData();
      formData.append("id", this.food._id);
      formData.append("photo", this.photo);
      formData.append("name", this.name);
      formData.append("type", this.type);
      formData.append("price", this.price);
      await this.$api.foods.updateFood(formData);
      this.dialog = false;
      this.$fetch();
    },
    reset() {
      this.$refs.form.reset();
    },
    async deleteFood() {
      await this.$api.foods.deleteFood(this.food._id);
      this.dialog = false;
      this.$fetch();
    },
  },
  async fetch() {
    await this.$api.foods.getFoods();
  },
};
</script>
