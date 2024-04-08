<script setup lang="ts">
const prop = defineProps(['task'])
</script>
<template>
  <div
    class="card flex flex-col p-4 shadow-md w-[25rem] max-w-md min-w-30 rounded-lg"
    :class="{
      'bg-green text-black': prop.task.getState() === 'done',
      'bg-red text-white': prop.task.getState() === 'pending',
      'bg-yellow text-black': prop.task.getState() === 'progress'
    }"
  >
    <div class="title font-bold text-xl mb-5">
      {{ prop.task.getTitle() }}
    </div>
    <div class="description flex gap-2">
      <p class="font-bold">Descripción</p>
      <p>
        {{ prop.task.getDescription() }}
      </p>
    </div>
    <div class="status flex gap-2 mt-5">
      <p class="font-bold">
        {{ prop.task.getStateName() }}
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
