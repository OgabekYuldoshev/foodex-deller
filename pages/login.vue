<template>
  <v-row no-gutters justify="center" align="center">
    <v-card width="600" min-width="300" class="mx-5">
      <v-card-title>FOODEX Deller System</v-card-title>
      <v-card-text>
        <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        @submit.prevent="login"
      >
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
          <nuxt-link to="/forgot">
            <p class="text-purple">Forgot Password or Username?</p>
          </nuxt-link>
          <nuxt-link to="/register">
            <p class="text-purple">Create your business!</p>
          </nuxt-link>
        </div>
        <v-btn :disabled="!valid" color="success" class="mr-4" type="submit">
          Sign In
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
  name: "login",
  data: () => ({
    valid: true,
    show1: false,
    username: "",
    usernameRules: [
      (v) => !!v || "Username is required",
      (v) => (v && v.length >= 3) || "Username must be under than 3 characters",
    ],
    password: "",
    passwordRules: [
      (v) => !!v || "Password is required",
      (v) => (v && v.length >= 6) || "Password must be under than 6 characters",
    ],
  }),
  methods: {
    async login() {
      let valid = await this.$refs.form.validate();
      if (!valid) {
        return;
      }
      this.$toast.show("Logging in...");
      await this.$auth
        .loginWith("local", {
          data: {
            username: this.username,
            password: this.password,
          },
        })
        .then(() => {
          this.$toast.success("Successfully authenticated");
          this.$router.push("/");
        })
        .catch((err) => {
          this.$toast.error(err);
          console.log(err)
        });
    },
  },
};
</script>
