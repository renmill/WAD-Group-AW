<script setup>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import PostCard from "../components/PostCard.vue";

const store = useStore();
const status = computed(() => store.state.status);
const error = computed(() => store.state.error);
const postIds = computed(() => store.state.posts.map((post) => post.id));

onMounted(() => store.dispatch("loadPosts"));
</script>

<template>
  <main class="posts">
    <p v-if="status === 'idle' || status === 'loading'">Loading posts...</p>
    <p v-else-if="status === 'error'" role="alert">{{ error }}</p>
    <PostCard v-for="id in postIds" :key="id" :id="id" />
  </main>
</template>
