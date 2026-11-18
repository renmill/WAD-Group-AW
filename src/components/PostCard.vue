<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

//the parent passes an ID, not the post's content.
const props = defineProps({
  id: { type: Number, required: true },
});

const store = useStore();
//obtain the post's content from the Vuex global store.
const post = computed(() => store.getters.postById(props.id));
// JSON paths look like "images/kitty.jpg". Add Vite's base path
// so those images work on GitHub Pages as well as locally.
const assetUrl = (path) => `${import.meta.env.BASE_URL}${path}`;

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Europe/Tallinn",
});
</script>

<template>
  <article v-if="post" class="post">
    <div class="post-header">
      <img
        class="post-profile"
        :src="assetUrl(post.avatar)"
        :alt="`${post.author}'s profile picture`"
      />
      <strong>{{ post.author }}</strong>
      <time class="post-date" :datetime="post.createdAt">
        {{ dateFormatter.format(new Date(post.createdAt)) }}
      </time>
    </div>

    <img
      v-if="post.image"
      class="post-image"
      :src="assetUrl(post.image)"
      :alt="post.imageAlt"
      loading="lazy"
    />

    <p>{{ post.text }}</p>
    <button class="like-button" type="button" disabled>👍</button>
  </article>
</template>
