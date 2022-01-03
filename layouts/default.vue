<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="true"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
          <v-spacer />
          <div v-if="item.to == '/'" class="mr-5">
            <v-badge
              v-if="
                $constants.notification($store.state.orders.orders, 'check')
              "
              :content="
                $constants.notification($store.state.orders.orders, 'length')
              "
            ></v-badge>
          </div>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="true" fixed app>
      <v-badge
        :value="$constants.notification($store.state.orders.orders, 'check')"
        color="green"
        overlap
        dot
      >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      </v-badge>
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? "right" : "left"}` }}</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn @click.stop="newTab()">
        <v-icon> mdi-earth </v-icon>
      </v-btn>
      <v-btn @click.stop="rightDrawer = !rightDrawer">
        <v-icon left> mdi-account </v-icon>{{ $auth.user.fullname }}
      </v-btn>
      <!-- <v-btn @click.prevent=""> play </v-btn> -->
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <Verification v-if="!$auth.user.access" />
        <!-- hello {{$auth.user.access}} -->
        <Nuxt v-else />
      </v-container>
    </v-main>
    <v-navigation-drawer v-model="rightDrawer" :right="true" temporary fixed>
      <SideUser />
    </v-navigation-drawer>
    <v-footer app>
      <span>&copy; Powered by <a href="/">Ogabek Yuldoshev</a></span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: true,
      items: [
        {
          icon: "mdi-order-bool-ascending-variant",
          title: "Orders",
          to: "/",
        },
        {
          icon: "mdi-food",
          title: "Foods",
          to: "/foods",
        },
        {
          icon: "mdi-qrcode-scan",
          title: "QR Code Generator",
          to: "/qr-generator",
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "FOODEX Deller System",
    };
  },
  created() {
    this.$fetch();
  },
  async fetch() {
    await this.$api.orders.getOrders();
  },
  mounted() {
    if (!Notification) {
      alert(
        "Desktop notifications not available in your browser. Try Chromium."
      );
      return;
    }

    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
    this.socket = this.$nuxtSocket({
      name: "main",
    });
    this.socket.on("new_order", async (data) => {
      this.notifyMe();
      this.playSound("/alert.wav");
      this.$toast.success(data.msg);
      await this.$api.orders.getOrders();
    });
  },
  methods: {
    newTab() {
      window.open(`${window.location.origin}/show`);
    },
    playSound(sound) {
      if (sound) {
        var audio = new Audio(sound);
        audio.play();
      }
    },
    notifyMe() {
      if (Notification.permission !== "granted")
        Notification.requestPermission();
      else {
        var notification = new Notification("New Order", {
          icon: "/favicon.ico",
          body: "You have a new order, Please check it !",
        });
        notification.onclick = function () {
          window.open(window.location.origin);
        };
      }
    },
  },
};
</script>
