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
});
