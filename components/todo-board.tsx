"use client"

import { useState, useCallback } from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { TouchBackend } from "react-dnd-touch-backend"
import { TodoLane } from "./todo-lane"
import { AddTodoForm } from "./add-todo-form"
import { EditTodoModal } from "./edit-todo-modal"
import { useTodos } from "@/hooks/use-todos"
import type { Todo, TodoStatus } from "@/types/todo"
import { useIsMobile } from "@/hooks/use-mobile"
import { Loader2 } from "lucide-react"

const LANES: { status: TodoStatus; title: string; color: string }[] = [
  { status: "pending", title: "Pending", color: "bg-yellow-100 border-yellow-300" },
  { status: "in-progress", title: "In Progress", color: "bg-blue-100 border-blue-300" },
  { status: "completed", title: "Completed", color: "bg-green-100 border-green-300" },
]

export function TodoBoard() {
  const isMobile = useIsMobile()
  const { todos, loading, error, addTodo, updateTodo, deleteTodo, moveTodo } = useTodos()
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null)

  const handleEditTodo = useCallback((todo: Todo) => {
    setEditingTodo(todo)
  }, [])

  const handleSaveTodo = useCallback(
    async (updatedTodo: Partial<Todo>) => {
      if (editingTodo) {
        await updateTodo(editingTodo.id, updatedTodo)
        setEditingTodo(null)
      }
    },
    [editingTodo, updateTodo],
  )

  const handleDeleteTodo = useCallback(
    async (id: number) => {
      await deleteTodo(id)
    },
    [deleteTodo],
  )

  const handleMoveTodo = useCallback(
    async (todoId: number, newStatus: TodoStatus) => {
      await moveTodo(todoId, newStatus)
    },
    [moveTodo],
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-600">Loading todos...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-8">
        <p className="text-lg font-semibold">Error loading todos</p>
        <p className="text-sm mt-2">{error}</p>
      </div>
    )
  }

  return (
    <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
      <div className="space-y-6">
        <AddTodoForm onAddTodo={addTodo} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {LANES.map((lane) => (
            <TodoLane
              key={lane.status}
              status={lane.status}
              title={lane.title}
              color={lane.color}
              todos={todos.filter((todo) => todo.status === lane.status)}
              onEditTodo={handleEditTodo}
              onDeleteTodo={handleDeleteTodo}
              onMoveTodo={handleMoveTodo}
            />
          ))}
        </div>

        {editingTodo && (
          <EditTodoModal todo={editingTodo} onSave={handleSaveTodo} onClose={() => setEditingTodo(null)} />
        )}
      </div>
    </DndProvider>
  )
}
