<template>
  <v-card>
    <v-card-title>
      Orders
      <v-spacer />
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="$store.state.orders.orders"
      :search="search"
    >
      <template v-slot:item.number="{ item }">
        <v-badge :value="!item.show" content="new" color="green" right>
          {{ item.number && item.number.toString().padStart(4, "0") }}
        </v-badge>
      </template>
      <template v-slot:item.paid="{ item }">
        <v-chip :color="item.paid ? 'green accent-4' : 'red accent-4'">
          {{ item.paid ? "paid" : "unpaid" }}
        </v-chip>
      </template>
      <template v-slot:item.status="{ item }">
        <v-chip :color="item.status ? 'green accent-4' : 'orange accent-4'">
          {{ item.status ? "success" : "pending" }}
        </v-chip>
      </template>
      <template v-slot:top>
        <v-dialog v-model="dialog" max-width="700px">
          <v-card>
            <v-card-title>
              <span class="text-h5"
                >Order #{{
                  selectedOrder.number &&
                  selectedOrder.number.toString().padStart(4, "0")
                }}</span
              >
              <v-spacer />
              <v-icon class="mr-2" @click="dialog = false"> mdi-close </v-icon>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-card elevation="10" class="mb-4">
                  <v-card-text>
                    <v-row>
                      <v-col> Order ID : {{ selectedOrder._id }} </v-col>
                      <v-col> Table : {{ selectedOrder.tableID }} </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
                <v-simple-table fixed-header height="300px">
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-left">Name</th>
                        <th class="text-left">Price</th>
                        <th class="text-left">Quantity</th>
                        <th class="text-left">All price</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in selectedOrder.foods" :key="item._id">
                        <td>{{ item.foodID.name }}</td>
                        <td>
                          {{ $constants.normalizer(item.foodID.price) }} sum
                        </td>
                        <td>x{{ item.qty }}</td>
                        <td>
                          {{
                            $constants.normalizer(item.qty * item.foodID.price)
                          }}
                          sum
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-container>
            </v-card-text>
            <v-card-text>
              <v-spacer></v-spacer>
              <h2>Total : {{ $constants.normalizer(total) }} sum</h2>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="done(selectedOrder._id, !selectedOrder.status)"
              >
                {{ selectedOrder.status ? "Return" : "Done" }}
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="paid(selectedOrder._id, !selectedOrder.paid)"
              >
                {{ selectedOrder.paid ? "Refund" : "Paid" }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon class="mr-2" @click="show_order(item._id)"> mdi-eye </v-icon>
        <!-- <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon> -->
      </template>
    </v-data-table>
  </v-card>
</template>
<script>
export default {
  name: "Dashboard",
  data() {
    return {
      search: "",
      dialog: false,
      selectedOrder: {},
      total: 0,
      headers: [
        {
          text: "Order Number",
          align: "start",
          filterable: false,
          value: "number",
        },
        { text: "Table", value: "tableID" },
        { text: "Foods", value: "foods.length" },
        { text: "Payment type", value: "payment" },
        { text: "Paid", value: "paid" },
        { text: "Status", value: "status" },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  methods: {
    async show_order(id) {
      this.dialog = true;
      await this.$api.orders.show(id);
      const selectedOrder = this.$store.state.orders.orders.find(
        (order) => order._id === id
      );
      this.selectedOrder = selectedOrder;
      this.total = selectedOrder.foods.reduce((t, c) => {
        return t + c.foodID.price * c.qty;
      }, 0);
      this.$api.orders.getOrders();
    },
    done(id, status) {
      // this.socket = this.$nuxtSocket({
      //   name: "main",
      // });
      // this.socket.emit("order", "hello");
      this.$api.orders.done({ id, status });
      this.$api.orders.getOrders();
      this.dialog = false;
    },
    paid(id, paid) {
      this.$api.orders.paid({ id, paid });
      this.$api.orders.getOrders();
      this.dialog = false;
    },
  },
};
</script>
