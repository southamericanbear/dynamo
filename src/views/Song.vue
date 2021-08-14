<template>
  <main>
    <section class="w-full mb-8 py-14 text-center text-white relative">
      <div
        class="absolute inset-0 w-full h-full box-border bg-contain music-bg"
        style="background-image: url(/assets/img/song-header.png)"
      ></div>
      <div class="container mx-auto flex items-center">
        <!-- Play/Pause Button -->
        <button
          type="button"
          class="
            z-50
            h-24
            w-24
            text-3xl
            bg-white
            text-black
            rounded-full
            focus:outline-none
          "
          @click.prevent="newSong(song)"
        >
          <i
            class="fas"
            :class="{ 'fa-play': !playing, 'fa-pause': playing }"
          ></i>
        </button>
        <div class="z-50 text-left ml-8">
          <!-- Song Info -->
          <div class="text-3xl font-bold">{{ song.modified_name }}</div>
          <div>{{ song.artist_name }}</div>
          <div>{{ song.genre }}</div>
        </div>
      </div>
    </section>
    <!-- Form -->
    <section class="container mx-auto mt-6" id="comments">
      <div
        class="bg-white rounded border border-gray-200 relative flex flex-col"
      >
        <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
          <!-- Comment Count -->
          <span class="card-title">Comments ({{ song.comment_count }})</span>
          <i class="fa fa-comments float-right text-green-400 text-2xl"></i>
        </div>
        <div class="p-6">
          <div
            class="text-white text-center font-bold p-4 m-b4"
            :class="comment_alert_variant"
            v-if="comment_show_alert"
          >
            {{ comment_alert_msg }}
          </div>
          <vee-form
            v-show="userLoggedIn"
            :validation-schema="schema"
            @submit="submitForm"
          >
            <vee-field
              as="textarea"
              name="comment"
              class="
                block
                w-full
                py-1.5
                px-3
                text-gray-800
                border border-gray-300
                transition
                duration-500
                focus:outline-none focus:border-black
                rounded
                mb-4
              "
              placeholder="Your comment here..."
            />
            <ErrorMessage class="text-red-500" name="comment" />
            <button
              type="submit"
              class="py-1.5 px-3 rounded text-white bg-green-600 block"
              :disabled="comment_in_submission"
            >
              Submit
            </button>
          </vee-form>
          <!-- Sort Comments -->
          <select
            v-model="sort"
            class="
              block
              mt-4
              py-1.5
              px-3
              text-gray-800
              border border-gray-300
              transition
              duration-500
              focus:outline-none focus:border-black
              rounded
            "
          >
            <option value="1">Latest</option>
            <option value="2">Oldest</option>
          </select>
        </div>
      </div>
    </section>
    <ul class="container mx-auto">
      <CommentItem
        v-for="comment in sortedComments"
        :key="comment.docID"
        :comment="comment"
      />
    </ul>
  </main>
</template>

<script>
import CommentItem from "@/components/molecules/CommentItem.vue";
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  name: "song",
  components: { CommentItem },
  data() {
    return {
      songID: this.$route.params.id,
      schema: {
        comment: "required|min:3",
      },
      sort: "1",
    };
  },
  computed: {
    ...mapState([
      "userLoggedIn",
      "song",
      "comment_in_submission",
      "comment_show_alert",
      "comment_alert_variant",
      "comment_alert_msg",
      "comments",
    ]),
    ...mapGetters(["playing"]),
    sortedComments() {
      return this.comments.slice().sort((a, b) => {
        if (this.sort === "1") {
          return new Date(b.datePosted) - new Date(a.datePosted);
        }
        return new Date(a.datePosted) - new Date(b.datePosted);
      });
    },
  },
  async created() {
    this.getSong(this.songID);

    const { sort } = this.$route.query;

    this.sort = sort === "1" || sort === "2" ? sort : "1";

    this.getComments();
  },
  methods: {
    ...mapActions(["getSong", "postComment", "getComments", "newSong"]),
    submitForm(value, { resetForm }) {
      this.postComment(value);
      resetForm();
      this.getComments();
    },
  },
  watch: {
    sort(newVal) {
      if (newVal === this.$route.query.sort) {
        return;
      }
      this.$router.push({
        query: {
          sort: newVal,
        },
      });
    },
  },
};
</script>
