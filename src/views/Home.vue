<template>
  <IntroSection />
  <Main />
</template>

<script>
import IntroSection from "@/components/IntroSection.vue";
import Main from "@/components/Main.vue";
export default {
  name: "home",
  components: {
    IntroSection,
    Main,
  },
};
</script>
