export const state = () => ({
    qr: []
  });
  
  export const mutations = {
    getQR(state, data) {
      console.log(data)
      state.qr = data;
    },
  };
  