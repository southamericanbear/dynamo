import { auth, userCollection } from "@/includes/firebase";

export default {
  state: {
    reg_in_submission: false,
    reg_show_alert: false,
    reg_alert_variant: "bg-blue-500",
    reg_alert_msg: "Please wait! Your account is being created.",
    login_in_submission: false,
    login_show_alert: false,
    login_alert_variant: "bg-blue-500",
    login_alert_msg: "Please wait! Your account is being created.",
    userCreated: null,
    userLogged: null,
    userLoggedIn: false,
    authModalShow: false,
    trash: {},
  },

  mutations: {
    toggleAuth() {
      this.state.userLoggedIn = !this.state.userLoggedIn;
    },
    toggleAuthModal() {
      this.state.authModalShow = !this.state.authModalShow;
    },
  },

  actions: {
    init_login({ commit }) {
      const user = auth.currentUser;

      if (user) {
        commit("toggleAuth");
      }
    },

    async register({ commit }, e) {
      this.state.reg_show_alert = true;
      this.state.reg_in_submission = true;
      this.state.reg_alert_variant = "bg-blue-500";
      this.state.reg_alert_msg = "Please wait! Your account is being created.";

      try {
        this.state.userCreated = await auth.createUserWithEmailAndPassword(
          e.email,
          e.password
        );
      } catch (error) {
        this.state.reg_in_submission = false;
        this.state.reg_alert_msg = "bg-red-500";
        this.state.reg_alert_msg =
          "An unexpected error occured. Please try again later.";
        return;
      }

      try {
        await userCollection.doc(this.state.userCreated.user.uid).set({
          name: e.name,
          email: e.email,
          age: e.age,
          country: e.country,
        });
      } catch (error) {
        this.state.reg_in_submission = false;
        this.state.reg_alert_msg = "bg-red-500";
        this.state.reg_alert_msg =
          "An unexpected error occured. Please try again later.";
        return;
      }

      await this.state.userCreated.user.updateProfile({
        displayName: e.name,
      });

      commit("toggleAuth");

      this.state.reg_alert_variant = "bg-green-500";
      this.state.reg_alert_msg = "Success! Your account has been created.";
      window.location.reload();
    },
    async login(value, e) {
      this.state.trash = value;
      this.state.login_show_alert = true;
      this.state.login_in_submission = true;
      this.state.login_alert_variant = "bg-blue-500";
      this.state.login_alert_msg =
        "Please wait! Your are going to be logged in.";

      try {
        this.state.userLogged = e;
        await auth.signInWithEmailAndPassword(e.email, e.password);
        window.location.reload();
      } catch (error) {
        this.state.login_in_submission = false;
        this.state.login_alert_variant = "bg-red-500";
        this.state.login_alert_msg = "Invalid credentials.";
      }
    },

    async signOut({ commit }) {
      await auth.signOut();
      commit("toggleAuth");
    },
  },
};
