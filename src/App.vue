<template>
  <Header />
  <IntroSection />
  <Main />
  <Player />
  <AuthModal />
</template>

<script>
import Header from "./components/Header.vue";
import IntroSection from "./components/IntroSection.vue";
import Main from "./components/Main.vue";
import Player from "./components/Player.vue";
import AuthModal from "./components/AuthModal.vue";

export default {
  components: {
    Header,
    IntroSection,
    Main,
    Player,
    AuthModal,
  },
};
</script>
