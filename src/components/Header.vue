<template>
  <header id="header" class="bg-gray-700 px-60">
    <nav class="container mx-auto flex justify-start items-center py-5 px-4">
      <!-- App Name -->
      <router-link
        class="text-white font-bold uppercase text-2xl mr-4"
        to="/"
        exact-active-class="no-active"
        >Music</router-link
      >
      <div class="flex flex-grow items-center">
        <!-- Primary Navigation -->
        <ul class="flex flex-row mt-1">
          <!-- Navigation Links -->
          <li v-if="!userLoggedIn">
            <a class="px-2 text-white" href="#" @click="toggleAuthModal"
              >Login / Register</a
            >
          </li>
          <template v-else>
            <li>
              <router-link class="px-2 text-white" to="/manage"
                >Manage</router-link
              >
              <a @click.prevent="signOut" class="px-2 text-white" href="#"
                >Logout</a
              >
            </li>
          </template>
        </ul>
        <ul class="flex flex-row mt-1 ml-auto">
          <li>
            <a href="#" class="px-2 text-white" @click.prevent="changeLocal">
              {{ currentlocale }}
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
  name: "Header",
  computed: {
    ...mapState(["userLoggedIn"]),
    currentlocale() {
      return this.$i18n.locale === "fr" ? "French" : "English";
    },
  },
  methods: {
    ...mapMutations(["toggleAuthModal"]),
    signOut() {
      this.$store.dispatch("signOut");

      if (this.$route.meta.requiresAuth) {
        this.$router.push({ name: "Home" });
      }
    },
    changeLocal() {
      this.$i18n.locale = this.$i18n.locale === "fr" ? "en" : "fr";
    },
  },
};
</script>

<style></style>
