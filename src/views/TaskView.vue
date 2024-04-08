<script setup lang="ts">
import { Task } from '@/models/task'
import { taskService } from '@/services/task.service'
import { onBeforeMount, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import TaskCard from '@/components/TaskCard.vue'
import ModalUpdateTask from '@/components/ModalUpdateTask.vue'

const route = useRoute()
const id: string = route.params.id as string
const create = ref(false)
const tasks = ref<Task[] | undefined>()

const getTasks = async () => {
  try {
    tasks.value = await taskService.fetchTasks(id)
  } catch (error) {
    console.error(error)
  }
}

const taskConfig = reactive({
  title: '',
  description: ''
})

const newTask = () => {
  create.value = true
}

const message = ref('')
const errorMessage = ref('')

const requestNewTask = async () => {
  try {
    const task = new Task(taskConfig.title, taskConfig.description, undefined, undefined)
    await taskService.createTask(task, id)
    message.value = 'Tarea creada con exito'
    setTimeout(() => {
      message.value = ''
    }, 3000)
    create.value = false
    getTasks()
  } catch (error) {
    errorMessage.value = 'Error al crear la tarea, intenta de nuevo más tarde'
    setTimeout(() => {
      errorMessage.value = ''
    }, 3000)
    console.error(error)
  }
}

const viewUpdateModal = ref(false)
const selectedTask = ref<number | undefined>(undefined)

const updateTask = (id: number | undefined) => {
  selectedTask.value = id
  viewUpdateModal.value = true
}

const updateAction = (status: boolean) => {
  viewUpdateModal.value = false
  if (status) {
    getTasks()
    message.value = 'Tarea actualizada con exito'
  } else {
    errorMessage.value = 'Error al actualizar la tarea, intenta de nuevo más tarde'
  }

  setTimeout(() => {
    message.value = ''
    errorMessage.value = ''
  }, 3000)
}

onBeforeMount(() => {
  getTasks()
})
</script>
<template>
  <main class="container mx-auto mt-10">
    <div class="header flex justify-between items-center">
      <div class="text">
        <h1 class="font-bold text-2xl">Tareas del usuario</h1>
        <p class="mt-2">Todas las tareas que tiene el usuario</p>
      </div>
      <div class="new-task" @click="newTask()">
        <span class="material-symbols-outlined bg-green rounded-full text-white"> add </span>
      </div>
    </div>
    <div v-if="tasks" class="mt-10">
      <div v-if="!create" class="flex gap-5 flex-wrap">
        <TaskCard
          v-for="(task, index) in tasks"
          :key="index"
          :task="task"
          @click="updateTask(task.getId())"
        />
      </div>
      <div v-if="create">
        <div class="form-container container mx-auto">
          <div class="header">
            <h2>Nueva tarea</h2>
          </div>

          <div class="title">
            <label for="title"> Titulo </label>
            <input class="p-2" type="text" v-model="taskConfig.title" />
          </div>
          <div class="desc">
            <label for="description"> Descripción </label>
            <textarea name="desc" id="description" v-model="taskConfig.description"></textarea>
          </div>
          <div class="actions">
            <button class="bg-blue text-white" @click="create = false">Ver tareas</button>
            <button class="bg-blue text-white" @click="requestNewTask()">Guardar</button>
          </div>
        </div>
      </div>
    </div>
    <div v-else>Loading ...</div>
    <div class="message text-green success" v-if="message">
      <p>{{ message }}</p>
    </div>
    <div class="message error text-red" v-if="errorMessage">
      <p>{{ errorMessage }}</p>
    </div>
  </main>
  <ModalUpdateTask
    v-if="viewUpdateModal"
    :id="selectedTask"
    @close="viewUpdateModal = false"
    @update-action="updateAction"
  />
</template>

<style scoped>
.message {
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: #f1f1f1;
  font-size: 1.2rem;
}

.error {
  border: 1px solid #b80c09;
}

.success {
  border: 1px solid green;
}

.form-container {
  max-width: 30rem;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  .header {
    align-items: center;
    margin-bottom: 1rem;
    border-bottom: 1px solid #ccc;
    h2 {
      font-size: 1.5rem;
      font-weight: bold;
    }
  }
  label {
    margin-top: 1rem;
  }
  input {
    width: 100%;
    padding: 0.5rem;
    margin-top: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
  }

  .desc {
    margin-top: 1rem;
    textarea {
      width: 100%;
      padding: 0.5rem;
      max-height: 8rem;
      margin-top: 0.5rem;
      border: 1px solid #ccc;
      border-radius: 0.5rem;
    }
  }

  .actions {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
    button {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 0.5rem;
      cursor: pointer;
      transition: all 0.3s;

      &:hover {
        filter: brightness(0.9);
      }
    }
  }
}
.header {
  .new-task {
    transition: all 0.3s;
    &:hover {
      transform: scale(1.05);
      cursor: pointer;
    }
    span {
      font-size: 3rem;
    }
  }
}
.material-symbols-outlined {
  font-variation-settings:
    'FILL' 1,
    'wght' 600,
    'GRAD' 20,
    'opsz' 1;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
