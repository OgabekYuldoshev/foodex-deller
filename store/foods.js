export const state = () => ({
  foods: [],
  types: [],
});

export const mutations = {
  foods(state, data) {
    state.foods = data;
  },
  types(state, data) {
    state.types = data;
  },
};
