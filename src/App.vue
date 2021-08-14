<template>
  <Header />
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component"></component>
    </transition>
  </router-view>
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

<style>
.fade-enter-form {
  opacity: 0;
}
.fade-enter-actice {
  transition: all 0.5s liner;
}
.fade-leave-to {
  transition: all 0.5s linear;
  opacity: 0;
}
</style>
