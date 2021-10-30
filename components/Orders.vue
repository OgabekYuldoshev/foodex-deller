<template>
      <v-card>
        <v-card-title>
            Orders
            <v-spacer/>
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
          <template v-slot:top>
            <v-dialog v-model="dialog" max-width="500px">
              <v-card>
                <v-card-title>
                  <span class="text-h5">Order Details {{selectedOrder.tableID}}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="Dessert name"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="Calories"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="Fat (g)"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="Carbs (g)"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="Protein (g)"></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text> Cancel </v-btn>
                  <v-btn color="blue darken-1" text> Save </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon class="mr-2" @click="show_order(item._id)">
              mdi-pencil
            </v-icon>
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
        { text: "Orders", value: "foods.length" },
        { text: "Payment", value: "payment" },
        { text: "Payed", value: "payed" },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  methods: {
    async show_order(id) {
      this.dialog = true;
      const selectedOrder = this.$store.state.orders.orders.find(order=> order._id === id)
      this.selectedOrder = selectedOrder
      console.log(this.selectedOrder)
    },
  },
  async fetch() {
    await this.$api.orders.getOrders();
  },
};
</script>
