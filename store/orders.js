export const state = () => ({
  orders: [],
});

export const mutations = {
  orders(state, data) {
    state.orders = data.sort(function (a, b) {
      return Number(new Date(b.created) - Number(new Date(a.created)));
    });
  },
};
