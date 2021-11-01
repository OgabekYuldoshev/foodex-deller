export default (axios, store, toast) => ({
  getOrders() {
    axios
      .get(`/orders`)
      .then((res) => {
        store.commit("orders/orders", res.data);
      })
      .catch((error) => {
        toast.error(error);
      });
  },
  done(data) {
    axios
      .put(`/order/done`, { id: data.id, status: data.status })
      .then((res) => {
        if (data.status) {
          toast.success("Order Done!");
        } else {
          toast.success("Order Returned Back!");
        }
      })
      .catch((error) => {
        toast.error(error);
      });
  },
  paid(data) {
    axios
      .put(`/order/paid`, { id: data.id, paid: data.paid })
      .then((res) => {
        toast.success("Order Successfully Paid !!!");
      })
      .catch((error) => {
        toast.error(error);
      });
  },
});
