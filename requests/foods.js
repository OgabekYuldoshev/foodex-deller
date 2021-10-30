export default (axios, store, toast) => ({
    getFoods() {
      axios
        .get(`/foods`)
        .then((res) => {
          store.commit("foods/foods", res.data);
        })
        .catch((error) => {
          toast.error(error);
        });
    },
    has_food(data) {
      axios
        .put(`/has_food`, {
          id: data.id,
          has : data.has
        })
        .then((res) => {
          toast.success("Successfull updated!");
        })
        .catch((error) => {
          toast.error(error);
        });
    },
  });
  