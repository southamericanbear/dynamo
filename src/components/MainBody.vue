<template>
  <!-- Main Content -->
  <section class="container mx-auto px-60 flex flex-col">
    <div class="bg-white rounded border border-gray-200 relative flex flex-col">
      <div
        class="px-6 pt-6 pb-5 font-bold border-b border-gray-200"
        v-icon.right.yellow="'headphones-alt'"
      >
        <span class="card-title">Songs</span>
        <!-- Icon -->
      </div>
      <!-- Playlist -->
      <ol id="playlist">
        <SongItem v-for="song in songs" :key="song.docID" :song="song" />
      </ol>
      <!-- .. end Playlist -->
    </div>
    <button
      class="
        block
        self-center
        mt-2
        w-50
        bg-purple-600
        text-white
        py-1.5
        px-3
        rounded
        transition
        hover:bg-purple-700
      "
      @click="loadMore"
    >
      Load More.
    </button>
  </section>
</template>

<script>
import SongItem from "@/components/molecules/SongItem.vue";
import { mapState, mapActions } from "vuex";
export default {
  name: "mainBody",
  components: { SongItem },
  computed: {
    ...mapState(["songs"]),
  },
  methods: {
    ...mapActions(["getSongs"]),
    loadMore() {
      this.getSongs();
    },
  },
};
</script>

<style></style>
