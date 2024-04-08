<script setup lang="ts"></script>
<template>
  <div class="w-100 shadow-md bg-timber">
    <nav class="p-4">
      <div class="container mx-auto flex justify-between items-center">
        <h1 class="font-bold text-2xl">Taskaroo</h1>
        <ul class="flex">
          <li class="mr-4 link">
            <router-link to="/">Home</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<style scoped>
.link {
  text-decoration: underline;
}
</style>
