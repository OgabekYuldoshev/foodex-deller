<template>
  <div id="verification">
    <v-card width="600" min-width="300" class="mx-5">
      <h2 class="text-center mt-5">
        <v-icon color="error" size="30">mdi-alert</v-icon> Verificate your
        account
      </h2>
      <v-card-text>
        <p class="text-center text-subtitle-1">
          A verification link has been sent to your email. Please, check your
          email and verify your account !
        </p>
        <div class="d-flex flex-column items-center justify-center">
          <v-text-field
            v-show="showInput"
            type="number"
            class="my-2"
            persistent-hint
            outline
            label="Enter Code"
            :rules="codeRules"
            v-model="code"
          ></v-text-field>
          <v-btn v-show="showInput" @click="verifyAccount" color="green">
            Verify Account
          </v-btn>
          <div
            v-if="!showInput"
            style="gap: 10px; width: 100%"
            class="d-flex justify-center"
          >
            <v-btn :loading="$store.state.app.loading" @click="$api.user.verifByEmail()" color="orange">
              Verify by Email
            </v-btn>
            <v-btn @click="verifyByNum" color="blue">
              Verify by phone number
            </v-btn>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Verification",
  data() {
    return {
      showInput: false,
      code: null,
      codeRules: [
        (value) => !!value || "Required.",
        (value) =>
          (value && value.length == 6) || "Code length must be 6 characters",
      ],
    };
  },
  methods: {
    verifyByNum() {
      this.showInput = true;
      this.$toast.info("Code Sent");
    },
    verifyAccount() {
      this.showInput = false;
      this.$toast.success("SuccessFully");
    },
  },
};
</script>

<style>
#verification {
  /* position: fixed;
  top: 0;
  left: 0; */
  width: 100%;
  padding-top: 10%;
  /* height: auto; */
  /* background: rgba(0, 0, 0, 0.7); */
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
