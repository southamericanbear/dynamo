import { createStore } from "vuex";
import modules from "./modules";
import { songsCollection, auth, commentsCollection } from "@/includes/firebase";
import router from "@/router/index.js";
import { Howl } from "howler";
import helper from "@/includes/helper";

export default createStore({
  state: {
    songs: [],
    song: {},
    comments: [],
    maxPerPage: 10,
    pendingRequest: false,
    comment_show_alert: false,
    comment_in_submission: false,
    comment_alert_variant: "bg-blue-500",
    comment_alert_msg: "Please wait! Your comment is being submitted.",
    currentSong: {},
    sound: {},
    seek: "00:00",
    duration: "00:00",
    playerProgress: "0%",
  },
  mutations: {
    newSong(state, payload) {
      state.currentSong = payload;
      state.sound = new Howl({
        src: [payload.url],
        html5: true,
      });
    },
    updatePosition(state) {
      state.seek = helper.formatTime(state.sound.seek());
      state.duration = helper.formatTime(state.sound.duration());
      state.playerProgress = `${
        (state.sound.seek() / state.sound.duration()) * 100
      }%`;
    },
  },
  getters: {
    playing: (state) => {
      if (state.sound.playing) {
        return state.sound.playing();
      }
      return false;
    },
  },
  actions: {
    async getSongs() {
      if (this.state.pendingRequest) {
        return;
      }
      this.state.pendingRequest = true;
      let snapshots;
      if (this.state.songs.length) {
        const lastDoc = await songsCollection
          .doc(this.state.songs[this.state.songs.length - 1].docID)
          .get();
        snapshots = await songsCollection
          .orderBy("modified_name")
          .startAfter(lastDoc)
          .limit(this.state.maxPerPage)
          .get();
      } else {
        snapshots = await songsCollection
          .orderBy("modified_name")
          .limit(this.state.maxPerPage)
          .get();
      }
      snapshots.forEach((document) => {
        this.state.songs.push({
          docID: document.id,
          ...document.data(),
        });
      });
      this.state.pendingRequest = false;
    },

    async getSong(payload, songID) {
      const docSnapshot = await songsCollection.doc(songID).get();
      if (!docSnapshot.exists) {
        router.push({ name: "Home" });
      }
      this.state.song = docSnapshot.data();
    },
    async postComment(payload, comment) {
      this.state.comment_in_submission = true;
      this.state.comment_show_alert = true;
      this.state.comment_alert_variant = "bg-blue-500";
      this.state.comment_alert_msg =
        "Please wait! Your comment is being submitted.";

      const post = {
        content: comment,
        datePosted: new Date().toString(),
        sid: router.currentRoute._value.params.id,
        name: auth.currentUser.displayName,
        uid: auth.currentUser.uid,
      };

      await commentsCollection.add(post);

      this.state.song.comment_count += 1;
      await songsCollection.doc(router.currentRoute._value.params.id).update({
        comment_count: this.state.song.comment_count,
      });

      this.state.comment_in_submission = false;
      this.state.comment_alert_variant = "bg-green-400";
      this.state.comment_alert_msg = "Comment added!";
      setTimeout(() => {
        this.state.comment_show_alert = false;
      }, 2000);
    },
    async getComments() {
      const snapshot = await commentsCollection
        .where("sid", "==", router.currentRoute._value.params.id)
        .get();
      this.state.comments = [];
      snapshot.forEach((doc) => [
        this.state.comments.push({
          docID: doc.id,
          ...doc.data(),
        }),
      ]);
    },

    async newSong({ commit, dispatch, state }, payload) {
      if (state.sound instanceof Howl) {
        state.sound.unload();
        commit("newSong", payload);
        state.sound.play();
        state.sound.on("play", () => {
          requestAnimationFrame(() => {
            dispatch("progress");
          });
        });
      } else {
        commit("newSong", payload);
        state.sound.play();
        state.sound.on("play", () => {
          requestAnimationFrame(() => {
            dispatch("progress");
          });
        });
      }
    },
    progress({ commit, dispatch, state }) {
      commit("updatePosition");
      if (state.sound.playing()) {
        requestAnimationFrame(() => {
          dispatch("progress");
        });
      }
    },
    async toggleAudio({ state }) {
      if (!state.sound.playing) {
        return;
      }

      if (state.sound.playing()) {
        state.sound.pause();
      } else {
        state.sound.play();
      }
    },
    updateSeek({ state, dispatch }, payload) {
      if (!state.sound.playing) {
        return;
      }
      const { x, width } = payload.currentTarget.getBoundingClientRect();
      const clickX = payload.clientX - x;
      const percentage = clickX / width;
      const seconds = state.sound.duration() * percentage;

      state.sound.seek(seconds);
      state.sound.once("seek", () => {
        dispatch("progress");
      });
    },
  },
  modules,
});
