<template>
  <div class="col-span-2">
    <div class="bg-white rounded border border-gray-200 relative flex flex-col">
      <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
        <span class="card-title">My Songs</span>
        <i class="fa fa-compact-disc float-right text-green-400 text-2xl"></i>
      </div>
      <div class="p-6">
        <!-- Composition Items -->
        <CompositionItem
          v-for="(song, i) in songs"
          :key="i"
          :song="song"
          :updateSong="updateSong"
          :index="i"
          :removeSong="removeSong"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { songsCollection, auth } from "@/includes/firebase";
import CompositionItem from "@/components/molecules/CompositionItem";

export default {
  name: "mySongsDashboard",
  data() {
    return {
      songs: [],
    };
  },
  components: { CompositionItem },
  async created() {
    const snapshot = await songsCollection
      .where("uid", "==", auth.currentUser.uid)
      .get();

    snapshot.forEach((document) => {
      const song = {
        ...document.data(),
        docID: document.id,
      };
      this.songs.push(song);
    });
  },
  methods: {
    updateSong(i, values) {
      this.songs[i].artist_name = values.artist_name;
      this.songs[i].modified_name = values.modified_name;
      this.songs[i].genre = values.genre;
    },
    removeSong(i) {
      this.songs.splice(i, 1);
    },
  },
};
</script>
