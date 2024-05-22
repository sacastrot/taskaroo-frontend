<script setup lang="ts">
/**
 * In this component we will display all the tasks of a user
 *
 * We will use the TaskCard component to display each task
 *
 * We will fetch the tasks from the task service
 *
 * We will display a loading message while the tasks are being fetched
 *
 *
 * @requires reactive
 * This dependency is used to create a reactive object
 *
 * @requires ref
 * This dependency is used to create a ref object
 *
 * @requires useRoute
 * This dependency is used to get the route params
 *
 * @requires TaskCard
 * This dependency is used to display each task
 *
 * @requires ModalUpdateTask
 * This dependency is used to display the modal for update a task
 */

//Vue imports
import { computed, onBeforeMount, reactive, ref } from 'vue'

//Vue Router imports
import { useRoute } from 'vue-router'

//Stores imports

//Models imports
import { Task } from '@/models/task'

//Views imports
import TaskCard from '@/components/TaskCard.vue'
import ModalUpdateTask from '@/components/ModalUpdateTask.vue'

//Services imports
import { taskService } from '@/services/task.service'

// Route instance to get the params
const route = useRoute()

const loadingCreate = ref(false)
const loadingView = ref(false)

// The id of the user from the route params
const id: string = route.params.id as string

// Flags for the create task form
const create = ref(false)

// Tasks list, with the type of Task model
const tasks = ref<Task[] | undefined>()

/**
 * Fetches the tasks from the task service, and stores them in the tasks variable
 */
const getTasks = async () => {
  try {
    tasks.value = await taskService.fetchTasks(id)
  } catch (error) {
    console.error(error)
  }
}

/**
 * The task configuration, to create a new task
 */
const taskConfig = reactive({
  title: '',
  description: ''
})

/**
 * Shows the create task form
 */
const newTask = () => {
  create.value = true
}

// Messages for the user
const message = ref('')
const errorMessage = ref('')

/**
 * Sends the request to create a new task
 */
const requestNewTask = async () => {
  try {
    // Set the loading flag to true
    loadingCreate.value = true

    // Create a new task with the task configuration
    const task = new Task(taskConfig.title, taskConfig.description, undefined, undefined)

    // Call the createTask method from the task service
    await taskService.createTask(task, id)

    // Set the success message
    message.value = 'Tarea creada con éxito'

    // After 3 seconds, the message will be hidden
    setTimeout(() => {
      message.value = ''
    }, 3000)
    create.value = false

    // Fetch the tasks again
    getTasks()
  } catch (error) {
    // If an error occurs, the error message will be displayed
    errorMessage.value = 'Error al crear la tarea, intenta de nuevo más tarde'

    // After 3 seconds, the error message will be hidden
    setTimeout(() => {
      errorMessage.value = ''
    }, 3000)
  } finally {
    // Reset the task configuration
    taskConfig.title = ''
    taskConfig.description = ''

    // Set the loading flag to false
    loadingCreate.value = false
  }
}

// Flag for the update task modal
const viewUpdateModal = ref(false)

// The id of the selected task
const selectedTask = ref<number | undefined>(undefined)

/**
 * Shows the update task modal
 * @param id
 * The id of the task to update
 */
const updateTask = (id: number | undefined) => {
  selectedTask.value = id
  viewUpdateModal.value = true
}

/**
 * Updates the tasks list after updating a task
 * @param status
 * The status of the update action
 */
const updateAction = (status: boolean) => {
  viewUpdateModal.value = false
  if (status) {
    getTasks()
    message.value = 'Tarea actualizada con éxito'
  } else {
    errorMessage.value = 'Error al actualizar la tarea, intenta de nuevo más tarde'
  }

  /**
   * After 3 seconds, the message and error message will be hidden
   */
  setTimeout(() => {
    message.value = ''
    errorMessage.value = ''
  }, 3000)
}

const sizeTasks = computed(() => tasks.value?.length)

/**
 * Thi hook will fetch the tasks before the component is mounted
 */
onBeforeMount(() => {
  getTasks()
})
</script>
<template>
  <main class="container mx-auto mt-10">
    <div class="header flex justify-between items-center">
      <div class="text">
        <!-- The title of de Home View and description -->
        <h1 class="font-bold text-2xl">Tareas del usuario</h1>
        <p class="mt-2">Todas las tareas que tiene el usuario</p>
      </div>
      <div class="new-task" @click="newTask()">
        <!-- The button to create a new task -->
        <span class="material-symbols-outlined bg-green rounded-full text-white"> add </span>
      </div>
    </div>
    <div v-if="tasks" class="mt-10">
      <div v-if="!create" class="flex gap-5 flex-wrap">
        <!-- The list of tasks -->
        <TaskCard
          v-for="(task, index) in tasks"
          :key="index"
          :task="task"
          @click="updateTask(task.getId())"
        />
      </div>
      <div v-if="create">
        <!-- The form to create a new task -->
        <div class="form-container container mx-auto">
          <div class="header">
            <!-- The title of the form -->
            <h2>Nueva tarea</h2>
          </div>

          <div class="title">
            <!-- The input to set the title of the task -->
            <label for="title"> Titulo </label>
            <input class="p-2" type="text" v-model="taskConfig.title" />
          </div>
          <div class="desc">
            <!-- The textarea to set the description of the task -->
            <label for="description"> Descripción </label>
            <textarea name="desc" id="description" v-model="taskConfig.description"></textarea>
          </div>
          <div class="actions">
            <!-- The buttons to save the task and to see the tasks -->
            <button class="bg-blue text-white" @click="create = false">Ver tareas</button>
            <button class="bg-blue text-white flex gap-1" @click="requestNewTask()">
              <svg
                class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                v-if="loadingCreate"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <p>Guardar</p>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- If there are no tasks, a loading message will be displayed -->
    <div v-else>
      <p>Cargando ...</p>
    </div>

    <!-- If there are no tasks, a message will be displayed -->
    <div v-if="sizeTasks == 0 && !create">
      <p>Aún no hay tareas registradas, puedes crear una usando el botón más</p>
    </div>

    <!-- The messages for the user -->
    <div class="message text-green success" v-if="message">
      <p>{{ message }}</p>
    </div>

    <!-- The error message -->
    <div class="message error text-red" v-if="errorMessage">
      <p>{{ errorMessage }}</p>
    </div>
  </main>

  <!-- The modal to update a task -->
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

/* The form to create a new task */
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

/* The button to create a new task */
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

/* Calsses for make the fade effect */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
