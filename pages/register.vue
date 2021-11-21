<template>
  <v-row no-gutters justify="center" align="center">
    <v-card width="600" min-width="300" class="mx-5">
      <v-card-title>Create Your Own Business with us!</v-card-title>
      <v-card-text>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          @submit.prevent="register"
        >
          <v-row>
            <v-col>
              <v-text-field
                v-model="fullname"
                :rules="fullnameRules"
                label="FullName"
                required
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="Email"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-model="number"
                :rules="numberRules"
                label="Ex: 998 xx xxx xx xx"
                required
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="address"
                :rules="addressRules"
                label="Address"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-text-field
            v-model="username"
            :rules="usernameRules"
            label="Username"
            required
          ></v-text-field>
          <!-- 
          <v-text-field
            v-model="password"
            :rules="passwordRules"
            label="Password"
            required
          ></v-text-field> -->
          <v-text-field
            v-model="password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="passwordRules"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="Password"
            @click:append="show1 = !show1"
          ></v-text-field>
          <div class="d-flex justify-space-between">
            <nuxt-link to="/login">
              <p class="text-purple">Sign In Your Account!</p>
            </nuxt-link>
          </div>
          <v-btn :disabled="!valid" color="success" class="mr-4" type="submit">
            Sign Up
          </v-btn>

          <!-- <v-btn color="error" class="mr-4" @click="reset"> Reset Form </v-btn>

          <v-btn color="warning" @click="resetValidation">
            Reset Validation
          </v-btn> -->
        </v-form>
      </v-card-text>
    </v-card>
  </v-row>
</template>

<script>
export default {
  layout: "auth",
  name: "Register",
  auth: "guest",
  data: () => ({
    valid: true,
    show1: false,
    username: "",
    usernameRules: [
      (v) => !!v || "Username is required",
      (v) => (v && v.length >= 3) || "Username must be under than 3 characters",
    ],
    fullname: "",
    fullnameRules: [
      (v) => !!v || "Fullname is required",
      (v) => (v && v.length >= 3) || "Username must be under than 3 characters",
    ],
    number: "998",
    numberRules: [
      (value) => !!value || "Required.",
      (value) =>
        (value && value.length == 12) || "Number length must be 12 characters",
    ],
    address: "",
    addressRules: [
      (v) => !!v || "Number is required",
      (v) => (v && v.length >= 3) || "Username must be under than 3 characters",
    ],
    email: "",
    emailRules: [
      (v) => !!v || "Email is required",
      (v) => (v && v.length >= 3) || "Username must be under than 3 characters",
    ],
    password: "",
    passwordRules: [
      (v) => !!v || "Password is required",
      (v) => (v && v.length >= 6) || "Password must be under than 6 characters",
    ],
  }),
  methods: {
    async register() {
      let valid = await this.$refs.form.validate();
      if (!valid) {
        return;
      }
      await this.$api.user.register({
        fullname: this.fullname,
        email: this.email,
        password: this.password,
        number: this.number,
        address: this.address,
        username: this.username,
      });
    },
  },
};
</script>
