import { createStore } from "vuex";
import modules from "./modules";

export default createStore({
  state: {
    authModalShow: false,
  },
  mutations: {
    toggleAuthModal: (state) => {
      state.authModalShow = !state.authModalShow;
    },
  },
  actions: {},
  modules,
});
