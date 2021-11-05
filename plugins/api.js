import Orders from "../requests/orders";
import Foods from "../requests/foods";
import User from "../requests/user";


export default (context, inject) => {
  const factories = {
    orders: Orders(context.$axios, context.store, context.$toast),
    foods: Foods(context.$axios, context.store, context.$toast),
    user: User(context.$axios, context.store, context.$toast),
  };

  inject("api", factories);
};
