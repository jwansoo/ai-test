<template>
  <div class="layout-container">
    <main class="main-container">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.layout-container {
  height: 100vh;
  background-color: var(--ui-bg);
}

.main-container {
  height: 100%;
}
</style>
