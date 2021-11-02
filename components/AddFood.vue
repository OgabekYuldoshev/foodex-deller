<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-file-input
      :rules="photoRules"
      @change="selectFile"
      accept="image/png, image/jpeg, image/jpg"
      placeholder="Pick an photo"
      prepend-icon="mdi-paperclip"
      label="Photo"
      ref="photo"
      required
    ></v-file-input>
    <v-text-field
      v-model="name"
      :counter="10"
      :rules="nameRules"
      label="Name"
      prepend-icon="mdi-hamburger"
      required
    ></v-text-field>

    <v-select
      v-model="select"
      :items="$store.state.foods.types"
      :rules="[(v) => !!v || 'Item is required']"
      prepend-icon="mdi-format-list-numbered-rtl"
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
      v-model="price"
      :rules="priceRules"
      prepend-icon="mdi-currency-usd"
      label="Price"
      required
    ></v-text-field>

    <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
      Save
    </v-btn>

    <v-btn color="error" class="mr-4" @click="reset"> Reset Form </v-btn>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    name: "",
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 30) || "Name must be less than 30 characters",
    ],
    price: "",
    priceRules: [
      (v) => !!v || "Price is required",
      (v) => (v && v.length > 0) || "Price must be under than 0 characters",
    ],
    photo: "",
    photoRules: [
      (v) => !!v || "Photo is required",
      (value) =>
        !value ||
        value.size < 2000000 ||
        "Avatar size should be less than 2 MB!",
    ],
    select: null,
  }),

  methods: {
    selectFile(event) {
      this.photo = event;
    },
    validate() {
      this.$refs.form.validate();
      var formData = new FormData();
      formData.append("photo", this.photo);
      formData.append("name", this.name);
      formData.append("type", this.select);
      formData.append("price", this.price);
      this.$api.foods.addNewFood(formData);
      this.reset();
    },
    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>
