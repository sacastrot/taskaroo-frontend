<script setup lang="ts">
/**
 * In this component we will display all the users in the system,
 * this component is used to show a task card
 *
 * @prop {Task} task
 * The task to display
 */
const prop = defineProps(['task'])
</script>
<template>
  <!-- Depending on the state of the task, the card will have a different color -->
  <div
    class="card flex flex-col p-4 shadow-md w-[25rem] max-w-md min-w-30 rounded-lg"
    :class="{
      'bg-green text-black': prop.task.getState() === 'done',
      'bg-red text-white': prop.task.getState() === 'pending',
      'bg-yellow text-black': prop.task.getState() === 'progress'
    }"
  >
    <!-- Section of title task -->
    <div class="title font-bold text-xl mb-5">
      {{ prop.task.getTitle() }}
    </div>
    <!-- Section of description task -->
    <div class="description flex gap-2">
      <p class="font-bold">Descripción</p>
      <p>
        {{ prop.task.getDescription() }}
      </p>
    </div>
    <!-- Section of status task -->
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
