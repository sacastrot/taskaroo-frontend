export class User {
  private id: number | undefined
  private name: string
  private email: string
  private password: string | undefined
  private is_active: boolean | undefined

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

  getId(): number {
    if (this.id) {
      return this.id
    } else {
      return -1
    }
  }

  getName(): string {
    return this.name
  }

  getEmail(): string {
    return this.email
  }

  getPassword(): string | undefined {
    return this.password
  }

  getIsActive(): boolean | undefined {
    return this.is_active
  }

  setId(id: number): void {
    this.id = id
  }

  setName(name: string): void {
    this.name = name
  }

  setEmail(email: string): void {
    this.email = email
  }

  setPassword(password: string): void {
    this.password = password
  }
}
