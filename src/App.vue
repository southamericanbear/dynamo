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

export default {
  components: {
    Header,
    Player,
    AuthModal,
  },
  created() {
    this.$store.dispatch("init_login");
  },
};
</script>
