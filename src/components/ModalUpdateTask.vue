<template>
  <div class="bg-modal h-screen w-screen flex justify-center items-center">
    <div class="modal">
      <div class="modal-content max-w-[40rem] min-w-[30rem] p-4 bg-white rounded-lg shadow">
        <div class="title text-xl font-bold flex justify-between">
          <h1>Cambio de estado</h1>
          <span class="material-symbols-outlined" @close="onClose()"> close </span>
        </div>
        <div class="body">
          <div class="form-control">
            <label for="state">Estado</label>
            <select id="state" v-model="selectState">
              <option v-for="state in states" :key="state" :value="state">{{ state }}</option>
            </select>
            <div class="error pt-2 pl-1">
              <p>{{ errorMessage }}</p>
            </div>
          </div>
          <button @click="requestUpdate()">Editar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { taskService } from '@/services/task.service'
import { ref } from 'vue'
import { errorMessages } from 'vue/compiler-sfc'

const { id } = defineProps(['id'])

const emit = defineEmits(['close', 'updateAction'])

const selectState = ref('Selecciona un estado')

const states = ['Selecciona un estado', 'Hecho', 'Pendiente', 'En progreso']

const onClose = () => {
  emit('close')
}

const updateAction = (status: boolean) => {
  emit('updateAction', status)
}

const errorMessage = ref('')

const requestUpdate = async () => {
  let status = -1
  if (selectState.value === 'Selecciona un estado') {
    errorMessage.value = 'Seleccione un estado'
    return
  } else {
    errorMessage.value = ''
  }

  switch (selectState.value) {
    case 'Hecho':
      status = 2
      break
    case 'Pendiente':
      status = 0
      break
    case 'En progreso':
      status = 1
      break
  }

  try {
    const response = await taskService.updateTask(status, id)
    updateAction(true)
  } catch (error) {
    updateAction(false)
    console.error(error)
  }
}
</script>

<style scoped>
.bg-modal {
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  .title {
    margin-bottom: 1rem;
    .material-symbols-outlined {
      cursor: pointer;
    }
  }
  .body {
    .form-control {
      margin-bottom: 1rem;
      label {
        display: block;
        margin-bottom: 0.5rem;
      }
      select {
        width: 100%;
        padding: 0.5rem;
        border-radius: 0.5rem;
        border: 1px solid #ccc;
      }
    }
    .error {
      p {
        color: #b80c09;
      }
    }
    button {
      padding: 0.5rem 1rem;
      background-color: #ccc;
      border: none;
      border-radius: 0.5rem;
      cursor: pointer;
    }
  }
}
</style>
