/**
 * In this file, we define the errors that can be thrown by the application
 * when there is a problem with the user.
 */

/**
 * UserError is thrown when there is a problem with the user.
 *
 * @constructor
 * @param {string} message
 * The error message to display
 */
export class UserError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'UserError'
  }
}
