export class Task {
  private id: number | undefined
  private title: string
  private description: string
  private owner: number | undefined
  private state: number | undefined

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

  getId(): number | undefined {
    return this.id
  }

  getTitle(): string {
    return this.title
  }

  getDescription(): string {
    return this.description
  }

  getOwner(): number | undefined {
    return this.owner
  }

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

  setId(id: number) {
    this.id = id
  }
}
