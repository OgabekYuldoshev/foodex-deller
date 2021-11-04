export const state = () => ({
    loading: true,
  });
  
  export const mutations = {
    setLoading(state, data) {
      state.loading = data;
    },
  };
  