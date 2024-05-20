<script setup lang="ts">
/**
 * This file is the starting point of the application.
 *
 * In this file, you will find the logic for the App component.
 *
 * This component is responsible for rendering the layout of the application.
 *
 * @requires RouterView
 * This component is used to render the views of the application.
 *
 * @requires NavBar
 * This component is used to render the navigation bar of the application.
 */

//Vue imports

//Vue Router imports
import { RouterView } from 'vue-router'

//Stores imports

//Models imports

//Views imports
import NavBar from '@/components/NavBar.vue'

//Services imports
</script>

<template>
  <header>
    <NavBar />
  </header>

  <!-- In this section will be displayed the views of the application -->
  <RouterView />
</template>

<style scoped></style>
