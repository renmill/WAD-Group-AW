<script setup>
import { ref } from "vue";

const email = ref("");
const password = ref("");

const signup = () => {
  console.log("Email:", email.value);
  console.log("Password:", password.value);
};
</script>

<template>
  <main class="signup-page">

<form class="signup-card" @submit.prevent="signup">

  <div class="form-row">
    <label for="signup-email">Email</label>
    <input
      id="signup-email"
      v-model="email"
      type="email"
      placeholder="Email"
      required
    />
  </div>

  <div class="form-row">
    <label for="signup-password">Password</label>
    <input
      id="signup-password"
      v-model="password"
      type="password"
      placeholder="Password"
      required
    />
  </div>

  <button type="submit">
    Signup
  </button>

</form>

  </main>
</template>