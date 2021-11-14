export default (axios, store, toast) => ({
  addNewFood(data) {
    axios
      .post(`/foods/add_food`, data, {
        "Content-Type": "multipart/form-data",
      })
      .then((res) => {
        toast.success(res.data);
      })
      .catch((error) => {
        toast.error(error);
      });
  },
  updateFood(data) {
    axios
      .put(`/foods/update_food`, data, {
        "Content-Type": "multipart/form-data",
      })
      .then((res) => {
        toast.success(res.data);
      })
      .catch((error) => {
        toast.error(error);
      });
  },
  deleteFood(id) {
    axios
      .delete(`/foods/delete_food?id=${id}`)
      .then((res) => {
        toast.success(res.data);
      })
      .catch((error) => {
        toast.error(error);
      });
  },
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
  getFoodTypes() {
    axios
      .get(`/foods/types`)
      .then((res) => {
        store.commit("foods/types", res.data);
      })
      .catch((error) => {
        toast.error(error);
      });
  },
  has_food(data) {
    axios
      .put(`/foods/has_food`, {
        id: data.id,
        has: data.has,
      })
      .then((res) => {
        toast.success("Successfull updated!");
      })
      .catch((error) => {
        toast.error(error);
      });
  },
});
