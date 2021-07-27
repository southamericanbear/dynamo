import { auth, userCollection } from "@/includes/firebase";

const state = {
  reg_in_submission: false,
  reg_show_alert: false,
  reg_alert_variant: "bg-blue-500",
  reg_alert_msg: "Please wait! Your account is being created.",
  userCreated: null,
  userLogged: null,
  trash: {},
};

const actions = {
  async register(value, e) {
    this.state.reg_show_alert = true;
    this.state.reg_in_submission = true;
    this.state.reg_alert_variant = "bg-blue-500";
    this.state.reg_alert_msg = "Please wait! Your account is being created.";
    this.state.trash = value;

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
      await userCollection.add({
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

    this.state.reg_alert_variant = "bg-green-500";
    this.state.reg_alert_msg = "Success! Your account has been created.";
  },
  login(value, e) {
    this.state.trash = value;
    this.state.userLogged = e;
  },
};

export default {
  state,
  actions,
};
