<script setup lang="ts">
import { adminUsersService } from '@/services/users.service'
import { onBeforeMount, ref } from 'vue'
import UserCard from './UserCard.vue'
import type { User } from '@/models/user'
import { useRouter } from 'vue-router'

const router = useRouter()
const users = ref<User[] | undefined>()

const redirectTo = (id: number) => {
  router.push({ name: 'task', params: { id } })
}

onBeforeMount(async () => {
  try {
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
