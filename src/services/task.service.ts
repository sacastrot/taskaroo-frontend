import api from './api.service'
import { NotFoundError } from '@/models/errors/ClientError'
import { UnknownError } from '@/models/errors/UnknownError'
import { UserError } from '@/models/errors/UserError'
import { Task } from '@/models/task'

// Export the service object
export const taskService = {
  fetchTasks,
  createTask,
  updateTask
}

/**
 * Fetches tasks for a specific user from the API.
 * @param id The ID of the user whose tasks are to be fetched.
 * @returns A promise that resolves with an array of Task objects.
 * @throws {UserError} When the user is not found.
 * @throws {UnknownError} When an unknown error occurs during fetching.
 */

async function fetchTasks(id: string): Promise<Task[]> {
  // Array to store fetched tasks
  const list: Task[] = []

  try {
    // Fetch tasks data from the API
    const { data } = await api.get(`users/${id}/tasks/`)

    // Iterate over fetched tasks data
    data.forEach((task: any) => {
      const tempTask = new Task(task.title, task.description, task.owner, task.state)

      // Set the ID for the task
      tempTask.setId(task.id)

      // Add the task to the list
      list.push(tempTask)
    })

    // Return the list of tasks
    return list
  } catch (error) {
    // Handle errors
    if (error instanceof NotFoundError) {
      // Throw a UserError when the user is not found
      throw new UserError('No users found')
    } else {
      // Throw an UnknownError when an unknown error occurs
      throw new UnknownError('An unknown error occurred while fetching users')
    }
  }
}

/**
 * Creates a new task for a specific user.
 * @param task The task object to be created.
 * @param id The ID of the user for whom the task is to be created.
 * @throws {UnknownError} When an unknown error occurs during creation.
 */

async function createTask(task: Task, id: string): Promise<void> {
  try {
    // Post the task data to the API
    const { data } = await api.post(`users/${id}/tasks/`, {
      title: task.getTitle(),
      description: task.getDescription()
    })
  } catch (error) {
    // Handle errors
    throw new UnknownError('An unknown error occurred while creating a task')
  }
}

/**
 * Updates the state of a task.
 * @param state The new state of the task.
 * @param id The ID of the task to be updated.
 * @throws {UnknownError} When an unknown error occurs during updating.
 */

async function updateTask(state: number, id: string): Promise<void> {
  try {
    // Put the task data to the API
    const { data } = await api.put(`tasks/${id}/?state=${state}`)
  } catch (error) {
    // Handle errors
    throw new UnknownError('An unknown error occurred while updating a task')
  }
}
