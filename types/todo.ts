export type TodoStatus = "pending" | "in-progress" | "completed"

export interface Todo {
  id: number
  todo: string
  description?: string
  priority: string
  status: TodoStatus
  completed: boolean
  userId: number
}
