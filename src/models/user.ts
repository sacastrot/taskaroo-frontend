/**
 * This file defines the User model.
 */

/**
 * User is a class that represents a user in the system.
 */
export class User {
  /**
   * id is the id of the user.
   */
  private id: number | undefined

  /**
   * name is the name of the user.
   */
  private name: string

  /**
   * email is the email of the user.
   */
  private email: string

  /**
   * password is the password of the user.
   */
  private password: string | undefined

  /**
   * is_active is the status of the user.
   */
  private is_active: boolean | undefined

  /**
   * The constructor of the User class.
   * Creates a new user with the given name, email, password and status.
   *
   * @param {string} name
   * The name of the user
   * @param {string} email
   * The email of the user
   * @param {string} password
   * The password of the user
   * @param {boolean} is_active
   * The status of the user
   */
  constructor(
    id: number | undefined,
    name: string,
    email: string,
    password: string | undefined,
    is_active: boolean | undefined
  ) {
    this.id = id
    this.name = name
    this.email = email
    this.password = password
    this.is_active = is_active
  }

  /**
   * getId returns the id of the user.
   * If the user does not have an id, it returns -1.
   * @returns
   * The id of the user
   */
  getId(): number {
    if (this.id) {
      return this.id
    } else {
      return -1
    }
  }

  /**
   * getName returns the name of the user.
   *
   * @returns {string}
   * The name of the user
   */
  getName(): string {
    return this.name
  }

  /**
   * getEmail returns the email of the user.
   *
   * @returns {string}
   * The email of the user
   */
  getEmail(): string {
    return this.email
  }

  /**
   * getPassword returns the password of the user.
   *
   * @returns {string | undefined}
   * The password of the user
   */
  getPassword(): string | undefined {
    return this.password
  }

  /**
   * getIsActive returns the status of the user.
   *
   * @returns {boolean | undefined}
   * The status of the user
   */
  getIsActive(): boolean | undefined {
    return this.is_active
  }

  /**
   * setId sets the id of the user.
   *
   * @param {number} id
   * The id of the user
   */
  setId(id: number): void {
    this.id = id
  }

  /**
   * setName sets the name of the user.
   *
   * @param {string} name
   * The name of the user
   */
  setName(name: string): void {
    this.name = name
  }

  /**
   * setEmail sets the email of the user.
   *
   * @param {string} email
   * The email of the user
   */
  setEmail(email: string): void {
    this.email = email
  }

  /**
   * setPassword sets the password of the user.
   *
   * @param {string} password
   * The password of the user
   */
  setPassword(password: string): void {
    this.password = password
  }
}
