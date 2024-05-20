<script setup lang="ts">
/**
 * In this component we will display all the users in the system
 *
 * @requires reactive
 * This dependency is used to create a reactive object
 *
 * @requires ref
 * This dependency is used to create a ref object
 */

//Vue imports
import { reactive, ref } from 'vue'

//Vue Router imports

//Stores imports

//Models imports
import { User } from '@/models/user'

//Views imports
import AllUsers from '@/components/AllUsers.vue'

//Services imports
import { adminUsersService } from '@/services/users.service'

/**
 * The user configuration, to create a new user
 */
const userConfig = reactive({
  name: '',
  email: '',
  password: ''
})

// Regular expressions for validate the email and password
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Creates a regular expression for validate the min and max length of a string
 *
 * @param min
 * Represents the minimum length of the string
 *
 * @param max
 * Represents the maximum length of the string
 */
const minMaxRegex = (min: number, max: number) => new RegExp(`^.{${min},${max}}$`)

// Messages for the user
const message = ref('')
const errorMessage = ref('')

// Regular expressions for validate the name and password
const nameRegex = minMaxRegex(3, 20)
const passwordRegex = minMaxRegex(8, 20)

/**
 * Validates the user configuration
 *
 * If the user configuration is invalid, the error object will be updated
 *
 * If the user configuration is valid, the error object will be empty
 *
 * The error object will be used to display the error messages in the form
 *
 */
const validateUser = () => {
  // Valid the name
  if (!nameRegex.test(userConfig.name)) {
    error.name = 'El nombre debe tener entre 3 y 20 caracteres'
  } else {
    error.name = ''
  }

  // Valid the email
  if (!emailRegex.test(userConfig.email)) {
    error.email = 'El email no es válido'
  } else {
    error.email = ''
  }

  // Valid the password
  if (!passwordRegex.test(userConfig.password)) {
    error.password = 'La contraseña debe tener entre 8 y 20 caracteres'
  } else {
    error.password = ''
  }
}

/**
 * Requests the creation of a new user
 *
 * If the user configuration is invalid, the function will return
 */
const requestNewUser = async () => {
  validateUser()
  if (error.name || error.email || error.password) {
    return
  }

  /**
   * Creates a temporary user with the user configuration
   */
  const tempUser = new User(
    undefined,
    userConfig.name,
    userConfig.email,
    userConfig.password,
    undefined
  )
  try {
    // Call the createUser method from the adminUsersService
    await adminUsersService.createUser(tempUser)
    message.value = 'Usuario creado con éxito'
  } catch (error) {
    // If an error occurs, the error message will be displayed
    errorMessage.value = 'Error al crear el usuario, intenta de nuevo más tarde'
  } finally {
    /**
     * After 3 seconds, the message and error message will be hidden
     */
    setTimeout(() => {
      message.value = ''
      errorMessage.value = ''
    }, 3000)
    userConfig.name = ''
    userConfig.email = ''
    userConfig.password = ''
    create.value = false
  }
}

// This flag is used to show the form to create a new user
const create = ref(false)

/*
 * Shows the form to create a new user
 */
const newUser = () => {
  create.value = true
}

/**
 * The error object, to display the error messages in the form
 */
const error = reactive({
  name: '',
  email: '',
  password: ''
})

/**
 * The password configuration, to show or hide the password
 */
const password = reactive({
  icon: 'visibility',
  type: 'password'
})

/**
 * Toggles the password visibility
 */
const togglePassword = () => {
  password.type = password.type === 'password' ? 'text' : 'password'
  password.icon = password.icon === 'visibility' ? 'visibility_off' : 'visibility'
}
</script>

<template>
  <main class="container mx-auto mt-10">
    <div class="header flex justify-between items-center">
      <div class="text">
        <!-- The title of de Home View and description -->
        <h1 class="font-bold text-2xl">Bienvenido</h1>
        <p class="mt-2">Todas las tareas que tiene el usuario</p>
      </div>
      <div class="new-task" @click="newUser()">
        <span class="material-symbols-outlined bg-green rounded-full text-white"> add </span>
      </div>
    </div>
    <div class="mt-10" v-if="!create">
      <!-- This displays all the users in the system, if you want to create a new user, click on the button above -->
      <AllUsers />
    </div>
    <div class="mt-10" v-if="create">
      <!-- This form is used to create a new user -->
      <div class="form-container container mx-auto">
        <div class="header">
          <h2>Nuevo usuario</h2>
        </div>
        <p class="mb-2">Crea un usuario con su contraseña</p>
        <!-- Input for the name user -->
        <div class="name">
          <label for="name">Nombre</label>
          <input type="text" id="name" v-model="userConfig.name" @blur="validateUser" />

          <!-- If the name is invalid, the error message will be displayed -->
          <p class="error text-red">{{ error.name }}</p>
        </div>

        <!-- Input for the email user -->
        <div class="email">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="userConfig.email" @blur="validateUser" />

          <!-- If the email is invalid, the error message will be displayed -->
          <p class="error text-red border-0">{{ error.email }}</p>
        </div>

        <!-- Input for the password user -->
        <div class="password">
          <label for="password">Contraseña</label>
          <div class="pass-input relative">
            <input
              :type="password.type"
              id="password"
              v-model="userConfig.password"
              @blur="validateUser"
            />
            <!-- This button is used to show or hide the password -->
            <div class="btn-password">
              <span id="iconPassword" class="material-symbols-outlined" @click="togglePassword">
                {{ password.icon }}</span
              >
            </div>
          </div>
          <!-- If the password is invalid, the error message will be displayed -->
          <p class="error text-red">{{ error.password }}</p>
        </div>
        <div class="actions">
          <!-- Button to show the users -->
          <button class="bg-green text-black font-bold" @click="create = false">
            Ver usuarios
          </button>

          <!-- Button to create a new user -->
          <button class="bg-green text-black font-bold" @click="requestNewUser()">Guardar</button>
        </div>
      </div>
    </div>
    <div>
      <!-- If the user is created successfully, the message will be displayed -->
      <div class="message text-green success" v-if="message">
        <p>{{ message }}</p>
      </div>

      <!-- If an error occurs, the error message will be displayed -->
      <div class="message error text-red" v-if="errorMessage">
        <p>{{ errorMessage }}</p>
      </div>
    </div>
  </main>
</template>

<style scoped>
.message {
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: #f1f1f1;
  font-size: 1.2rem;
}

/* The error message */
.error {
  border: 1px solid #b80c09;
}

/* The success message */
.success {
  border: 1px solid green;
}

/* The header of the Home View */
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

/* Represent the icon of toggle password */
.material-symbols-outlined {
  font-variation-settings:
    'FILL' 1,
    'wght' 600,
    'GRAD' 20,
    'opsz' 1;
}

/* The form container */
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
    margin-bottom: 0.5rem;
  }

  .btn-password {
    display: flex;
    justify-content: flex-end;
    position: absolute;
    top: 0;
    right: 0;
    span {
      cursor: pointer;
      padding: 1rem 1rem;
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
  .error {
    border: none;
  }
}
</style>
