<script setup lang="ts">
import AllUsers from '@/components/AllUsers.vue'
import { User } from '@/models/user'
import { adminUsersService } from '@/services/users.service'
import { reactive, ref } from 'vue'

const userConfig = reactive({
  name: '',
  email: '',
  password: ''
})

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const minMaxRegex = (min: number, max: number) => new RegExp(`^.{${min},${max}}$`)

const message = ref('')
const errorMessage = ref('')

const nameRegex = minMaxRegex(3, 20)
const passwordRegex = minMaxRegex(8, 20)

const validateUser = () => {
  if (!nameRegex.test(userConfig.name)) {
    error.name = 'El nombre debe tener entre 3 y 20 caracteres'
  } else {
    error.name = ''
  }

  if (!emailRegex.test(userConfig.email)) {
    error.email = 'El email no es válido'
  } else {
    error.email = ''
  }

  if (!passwordRegex.test(userConfig.password)) {
    error.password = 'La contraseña debe tener entre 8 y 20 caracteres'
  } else {
    error.password = ''
  }
}

const requestNewUser = async () => {
  validateUser()
  if (error.name || error.email || error.password) {
    return
  }

  const tempUser = new User(
    undefined,
    userConfig.name,
    userConfig.email,
    userConfig.password,
    undefined
  )
  try {
    await adminUsersService.createUser(tempUser)
    message.value = 'Usuario creado con éxito'
  } catch (error) {
    errorMessage.value = 'Error al crear el usuario, intenta de nuevo más tarde'
    console.error(error)
  } finally {
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

const create = ref(false)
const newUser = () => {
  create.value = true
}

const error = reactive({
  name: '',
  email: '',
  password: ''
})

const password = reactive({
  icon: 'visibility',
  type: 'password'
})

const togglePassword = () => {
  password.type = password.type === 'password' ? 'text' : 'password'
  password.icon = password.icon === 'visibility' ? 'visibility_off' : 'visibility'
}
</script>

<template>
  <main class="container mx-auto mt-10">
    <div class="header flex justify-between items-center">
      <div class="text">
        <h1 class="font-bold text-2xl">Bienvenido</h1>
        <p class="mt-2">Todas las tareas que tiene el usuario</p>
      </div>
      <div class="new-task" @click="newUser()">
        <span class="material-symbols-outlined bg-green rounded-full text-white"> add </span>
      </div>
    </div>
    <div class="mt-10" v-if="!create">
      <AllUsers />
    </div>
    <div class="mt-10" v-if="create">
      <div class="form-container container mx-auto">
        <div class="header">
          <h2>Nuevo usuario</h2>
        </div>
        <p class="mb-2">Crea un usuario con su contraseña</p>
        <div class="name">
          <label for="name">Nombre</label>
          <input type="text" id="name" v-model="userConfig.name" @blur="validateUser" />
          <p class="error text-red">{{ error.name }}</p>
        </div>
        <div class="email">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="userConfig.email" @blur="validateUser" />
          <p class="error text-red border-0">{{ error.email }}</p>
        </div>
        <div class="password">
          <label for="password">Contraseña</label>
          <div class="pass-input relative">
            <input
              :type="password.type"
              id="password"
              v-model="userConfig.password"
              @blur="validateUser"
            />
            <div class="btn-password">
              <span id="iconPassword" class="material-symbols-outlined" @click="togglePassword">
                {{ password.icon }}</span
              >
            </div>
          </div>
          <p class="error text-red">{{ error.password }}</p>
        </div>
        <div class="actions">
          <button class="bg-green text-black font-bold" @click="create = false">
            Ver usuarios
          </button>
          <button class="bg-green text-black font-bold" @click="requestNewUser()">Guardar</button>
        </div>
      </div>
    </div>
    <div>
      <div class="message text-green success" v-if="message">
        <p>{{ message }}</p>
      </div>
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

.error {
  border: 1px solid #b80c09;
}

.success {
  border: 1px solid green;
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
