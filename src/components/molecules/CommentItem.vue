<template>
  <li class="p-6 bg-gray-50 border border-gray-200">
    <!-- Comment Author -->
    <div class="mb-5">
      <div class="font-bold">{{ comment.name }}</div>
      <time>{{ comment.datePosted }}</time>
    </div>

    <p>
      {{ comment.content.comment }}
    </p>
  </li>
</template>

<script>
export default {
  name: "commentItem",
  props: ["comment"],
};
</script>
