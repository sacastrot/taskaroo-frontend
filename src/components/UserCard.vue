<script setup lang="ts">
const prop = defineProps(['user'])
</script>
<template>
  <div
    class="card flex flex-col p-4 shadow-md w-[25rem] max-w-md min-w-30 rounded-lg hover:bg-green hover:text-black"
  >
    <div class="title font-bold text-xl mb-5">
      {{ prop.user.getName() }}
    </div>
    <div class="email flex gap-2">
      <p class="font-bold">Email:</p>
      <p>
        {{ prop.user.getEmail() }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.card {
  transition: all 0.3s;
  &:hover {
    transform: scale(1.05);
    cursor: pointer;
  }
}
</style>
