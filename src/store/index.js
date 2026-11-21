import { createStore } from "vuex";

export default createStore({
  state: () => ({
    posts: [],
    status: "idle",
    error: "",
  }),

  getters: {
    postById: (state) => (id) => state.posts.find((post) => post.id === id),
  },

  mutations: {
    loading(state) {
      state.status = "loading";
      state.error = "";
    },

    loaded(state, posts) {
      state.posts = posts.map((post) => ({
        ...post,
        likes: 0,
      }));

      state.status = "loaded";
    },

    failed(state, message) {
      state.status = "error";
      state.error = message;
    },

    incrementLike(state, id) {
      const post = state.posts.find((post) => post.id === id);

      if (post) {
        post.likes++;
      }
    },

    resetLikes(state) {
      state.posts.forEach((post) => {
      post.likes = 0;
      });
    },
  },

  actions: {
    async loadPosts({ commit }) {
      commit("loading");
      try {
        const response = await fetch(
          `${import.meta.env.BASE_URL}data/posts.json`,
        );
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const posts = await response.json();
        if (!Array.isArray(posts)) throw new Error("Expected an array");

        commit("loaded", posts);
      } catch (error) {
        console.error(error);
        commit("failed", "Could not load posts.");
      }
    },
  },
});
