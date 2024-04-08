import { User } from '@/models/user'
import api from './api.service'
import { NotFoundError } from '@/models/errors/ClientError'
import { UnknownError } from '@/models/errors/UnknownError'
import { UserError } from '@/models/errors/UserError'

// Export the service object
export const adminUsersService = {
  fetchUsers,
  createUser
}

/**
 * Fetches users from the API.
 * @returns A promise that resolves with an array of User objects.
 * @throws {UserError} When the user is not found.
 * @throws {UnknownError} When an unknown error occurs during fetching.
 */
async function fetchUsers(): Promise<User[]> {
  // Array to store fetched users
  const list: User[] = []

  try {
    // Fetch users data from the API
    const { data } = await api.get('/users/')

    // Iterate over fetched users data
    data.forEach((user: any) => {
      const tempUser = new User(user.id, user.name, user.email, user.password, user.is_active)
      list.push(tempUser)
    })

    // Return the list of users
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
 * Creates a new user.
 * @param user The user object to be created.
 * @throws {UnknownError} When an unknown error occurs during creation.
 */
async function createUser(user: User): Promise<void> {
  try {
    // Create a new user in the API
    const { data } = await api.post('/users/', {
      name: user.getName(),
      email: user.getEmail(),
      password: user.getPassword()
    })
  } catch (error) {
    // Handle errors
    throw new UnknownError('An unknown error occurred while creating a user')
  }
}
