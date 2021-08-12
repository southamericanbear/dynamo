<template>
  <Header />
  <router-view></router-view>
  <Player />
  <AuthModal />
</template>

<script>
import Header from "./components/Header.vue";
import Player from "./components/Player.vue";
import AuthModal from "./components/AuthModal.vue";
import { mapActions } from "vuex";

export default {
  components: {
    Header,
    Player,
    AuthModal,
  },

  async created() {
    this.getSongs();
    this.$store.dispatch("init_login");
  },
  methods: {
    ...mapActions(["getSongs"]),
  },
};
</script>
