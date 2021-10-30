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
      <template v-slot:item.payed="{ item }">
        <v-chip :color="item.payed ? 'green accent-4' : 'red accent-4'">
          {{ item.payed ? "paid" : "unpaid" }}
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
              <span class="text-h5">Order #{{ selectedOrder.tableID }}</span>
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
                        <th class="text-left">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in selectedOrder.foods" :key="item._id">
                        <td>{{ item.foodID.name }}</td>
                        <td>x{{ item.qty }}</td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="done(selectedOrder._id, !selectedOrder.status)"
              >
                Done
              </v-btn>
              <v-btn color="blue darken-1" text> Paid </v-btn>
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
      headers: [
        {
          text: "Order ID",
          align: "start",
          filterable: false,
          value: "_id",
        },
        { text: "Table", value: "tableID" },
        { text: "Foods", value: "foods.length" },
        { text: "Payment type", value: "payment" },
        { text: "Paid", value: "payed" },
        { text: "Status", value: "status" },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  methods: {
    async show_order(id) {
      this.dialog = true;
      const selectedOrder = this.$store.state.orders.orders.find(
        (order) => order._id === id
      );
      this.selectedOrder = selectedOrder;
    },
    async done(id, status) {
      this.dialog = false;
    },
  },
  
};
</script>
