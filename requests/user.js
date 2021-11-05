export default (axios, store, toast) => ({
  getQR() {
    axios
      .get(`/user/QR`)
      .then((res) => {
        store.commit("app/getQR", res.data);
      })
      .catch((error) => {
        toast.error(error);
      });
  },
  generateQR(data) {
    axios
      .put(`/user/generateQR`, { tableQR: data })
      .then((res) => {
        toast.success("QR Table Code Successfully Generated!");
      })
      .catch((error) => {
        toast.error(error);
      });
  },
});
