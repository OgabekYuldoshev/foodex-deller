export default (axios, store, toast) => ({
  register(data) {
    axios
      .post(`/register`, data)
      .then((res) => {
        toast.success(res.data.msg);
      })
      .catch((error) => {
        toast.error(error);
      });
  },
  verifByEmail() {
    store.commit("app/loadingStart");
    axios
      .get(`/verifyByEmail`)
      .then((res) => {
        toast.success(res.data.msg);
        store.commit("app/loadingEnd");
      })
      .catch((error) => {
        toast.error(error);
        store.commit("app/loadingEnd");
      });
  },
  getQR() {
    store.commit('app/loadingStart')
    console.log('daksjhasdhkkajsdghjk')
    axios
      .get(`/user/QR`)
      .then((res) => {
        store.commit("app/getQR", res.data);
      })
      .catch((error) => {
        toast.error(error);
      });
    store.commit('app/loadingEnd')

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
