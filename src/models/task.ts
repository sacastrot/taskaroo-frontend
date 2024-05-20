/**
 * In this file, we define the models that are used in the application.
 */

/**
 * Task is a class that represents a task in the application.
 */
export class Task {
  /**
   * id is the id of the task.
   */
  private id: number | undefined

  /**
   * title is the title of the task.
   */
  private title: string

  /**
   * description is the description of the task.
   */
  private description: string

  /**
   * owner is the id of the user that owns the task.
   */
  private owner: number | undefined

  /**
   * state is the state of the task.
   * 0: pending
   * 1: progress
   * 2: done
   */
  private state: number | undefined

  /**
   * The constructor of the Task class.
   * Creates a new task with the given title, description, owner and state.
   *
   * @param {string} title
   * The title of the task
   * @param {string} description
   * The description of the task
   * @param {number} owner
   * The id of the user that owns the task
   * @param {number} state
   * The state of the task
   */
  constructor(
    title: string,
    description: string,
    owner: number | undefined,
    state: number | undefined
  ) {
    this.title = title
    this.description = description
    this.owner = owner
    this.state = state
  }

  /**
   * getId returns the id of the task.
   *
   * @returns {number | undefined}
   * The id of the task
   */

  getId(): number | undefined {
    return this.id
  }

  /**
   * getTitle returns the title of the task.
   *
   * @returns {string}
   * The title of the task
   */
  getTitle(): string {
    return this.title
  }

  /**
   * getDescription returns the description of the task.
   *
   * @returns {string}
   * The description of the task
   */
  getDescription(): string {
    return this.description
  }

  /**
   * getOwner returns the id of the user that owns the task.
   *
   * @returns {number | undefined}
   * The id of the user that owns the task
   */
  getOwner(): number | undefined {
    return this.owner
  }

  /**
   * getState returns the state of the task.
   *
   * @returns {number | undefined}
   * The state of the task
   */
  getState(): string | undefined {
    if (this.state === undefined) {
      return undefined
    } else if (this.state === 0) {
      return 'pending'
    } else if (this.state === 1) {
      return 'progress'
    } else if (this.state === 2) {
      return 'done'
    }
  }

  /**
   * setState sets the state of the task.
   *
   * @param {number} state
   * The state of the task
   */
  getStateName(): string | undefined {
    if (this.state === undefined) {
      return undefined
    } else if (this.state === 0) {
      return 'Pendiente'
    } else if (this.state === 1) {
      return 'En pogreso'
    } else if (this.state === 2) {
      return 'Hecho'
    }
  }

  /**
   * setState sets the current state of the task.
   * @param id
   * The id of the task
   */
  setId(id: number) {
    this.id = id
  }
}
