<template>
  <div>
    <h1>About page</h1>
    <NuxtLink to="/">Home page</NuxtLink>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  layout: "orange",
  layoutTransition: {
    name: "slide-in",
  },
});
</script>
