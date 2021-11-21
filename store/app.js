export const state = () => ({
    qr: [],
    loading:false
  });
  
  export const mutations = {
    getQR(state, data) {
      state.qr = data;
    },
    loadingStart(state) {
      state.loading = true;
    },
    loadingEnd(state) {
      state.loading = false;
    },
  };
  