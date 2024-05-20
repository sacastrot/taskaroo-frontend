<script setup lang="ts">
/**
 * In this component we will display all the users in the system
 *
 * We will use the UserCard component to display each user
 *
 * We will fetch the users from the users service
 *
 * We will redirect to the user page when the user card is clicked
 *
 * We will display a loading message while the users are being fetched
 *
 * We will display an error message if the users can't be fetched
 *
 * @requires vue-router
 * For redirecting to the task page
 *
 * @requires adminUsersService
 * This dependency is used to fetch the users
 *
 * @requires User
 * This model is used like a type for the users after fetching them
 */

//Vue imports
import { onBeforeMount, ref } from 'vue'

//Vue Router imports
import { useRouter } from 'vue-router'

//Stores imports

//Models imports
import type { User } from '@/models/user'

//Views imports
import UserCard from './UserCard.vue'

//Services imports
import { adminUsersService } from '@/services/users.service'

// Router instance to redirect to the task page
const router = useRouter()

// Users list, with the type of User model
const users = ref<User[] | undefined>()

/**
 * Redirects to the another page
 *
 * @param id
 * The id of the user to redirect to
 */
const redirectTo = (id: number) => {
  router.push({ name: 'task', params: { id } })
}

/**
 * Fetches the users from the users service, and stores them in the users variable
 * before the component is mounted
 */
onBeforeMount(async () => {
  try {
    // call the fetchUsers method from the users service
    users.value = await adminUsersService.fetchUsers()
  } catch (error) {
    console.error(error)
  }
})
</script>
<template>
  <div class="flex gap-5 flex-wrap" v-if="users">
    <UserCard
      v-for="(user, index) in users"
      :key="index"
      :user="user"
      @click="redirectTo(user.getId())"
    />
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<style scoped></style>
