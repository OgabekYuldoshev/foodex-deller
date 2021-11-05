<template>
  <div>
    <div class="d-flex align-center justify-space-between">
      <h2>QR Code Table Generator</h2>
      <v-card>
        <v-card-text>
          <input
            v-model="count"
            id="number"
            type="number"
            placeholder="tables"
          />
          <v-btn :disabled="count == 0" @click="generate" color="primary"
            >Generate</v-btn
          >
        </v-card-text>
      </v-card>
    </div>
    <div class="d-flex flex-wrap item mt-5">
      <div
        v-for="code in $store.state.app.qr && $store.state.app.qr"
        :key="code"
      >
        <vue-qr :text="code.url"></vue-qr>
        <p class="text-center">{{ code.name }}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "QRCode",
  data() {
    return {
      count: 0,
      QR: [],
    };
  },
  created() {
    this.$fetch();
  },

  methods: {
    generate() {
      this.QR = [];
      if (this.count <= 100) {
        for (let i = 0; i < this.count; i++) {
          this.QR.push({
            url:
              "https://fxs.vercel.app/" +
              this.$auth.user._id +
              "/" +
              (i + 1) +
              "/foods",
            name: "Tabel " + (i + 1),
          });
        }
      } else {
        this.$toast.info("Table number must be less 100 chapters");
      }
      this.$api.user.generateQR(this.QR);
      this.$fetch();
    },
  },
  async fetch() {
    await this.$api.user.getQR();
  },
};
</script>

<style>
#number {
  color: white;
  padding: 10px;
  border: 2px solid gray;
  border-radius: 5px;
}
.item {
  gap: 20px;
}
</style>
