"use client"

import { useState, useEffect, useCallback } from "react"
import type { Todo, TodoStatus } from "@/types/todo"
import { todoApi } from "@/lib/api"

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch todos on mount
  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    try {
      setLoading(true)
      setError(null)
      const fetchedTodos = await todoApi.getTodos()
      setTodos(fetchedTodos)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch todos")
    } finally {
      setLoading(false)
    }
  }

  const addTodo = useCallback(async (todoData: { todo: string; description?: string; priority: string }) => {
    try {
      const newTodo = await todoApi.createTodo(todoData)
      setTodos((prev) => [newTodo, ...prev])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add todo")
      throw err
    }
  }, [])

  const updateTodo = useCallback(async (id: number, updates: Partial<Todo>) => {
    try {
      const updatedTodo = await todoApi.updateTodo(id, updates)
      setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, ...updatedTodo } : todo)))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update todo")
      throw err
    }
  }, [])

  const deleteTodo = useCallback(async (id: number) => {
    try {
      await todoApi.deleteTodo(id)
      setTodos((prev) => prev.filter((todo) => todo.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete todo")
      throw err
    }
  }, [])

  const moveTodo = useCallback(
    async (todoId: number, newStatus: TodoStatus) => {
      // Optimistic update
      setTodos((prev) => prev.map((todo) => (todo.id === todoId ? { ...todo, status: newStatus } : todo)))

      try {
        await todoApi.updateTodo(todoId, { status: newStatus })
      } catch (err) {
        // Revert on error
        setTodos((prev) =>
          prev.map((todo) =>
            todo.id === todoId ? { ...todo, status: todos.find((t) => t.id === todoId)?.status || "pending" } : todo,
          ),
        )
        setError(err instanceof Error ? err.message : "Failed to move todo")
        throw err
      }
    },
    [todos],
  )

  return {
    todos,
    loading,
    error,
    addTodo,
    updateTodo,
    deleteTodo,
    moveTodo,
    refetch: fetchTodos,
  }
}
