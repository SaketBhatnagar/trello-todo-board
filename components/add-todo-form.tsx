"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Loader2 } from "lucide-react"

interface AddTodoFormProps {
  onAddTodo: (todo: { todo: string; description?: string; priority: string }) => Promise<void>
}

export function AddTodoForm({ onAddTodo }: AddTodoFormProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    todo: "",
    description: "",
    priority: "medium",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.todo.trim()) return

    setIsLoading(true)
    try {
      await onAddTodo({
        todo: formData.todo.trim(),
        description: formData.description.trim() || undefined,
        priority: formData.priority,
      })
      setFormData({ todo: "", description: "", priority: "medium" })
      setIsOpen(false)
    } catch (error) {
      console.error("Failed to add todo:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    setFormData({ todo: "", description: "", priority: "medium" })
    setIsOpen(false)
  }

  if (!isOpen) {
    return (
      <Card className="border-dashed border-2 border-gray-300 hover:border-blue-400 transition-colors">
        <CardContent className="p-6">
          <Button
            onClick={() => setIsOpen(true)}
            variant="ghost"
            className="w-full h-12 text-gray-600 hover:text-blue-600"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add New Task
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-blue-200 shadow-md">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              placeholder="Task title *"
              value={formData.todo}
              onChange={(e) => setFormData((prev) => ({ ...prev, todo: e.target.value }))}
              className="text-lg font-medium"
              disabled={isLoading}
              autoFocus
            />
          </div>

          <div>
            <Textarea
              placeholder="Description (optional)"
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              className="min-h-[80px] resize-none"
              disabled={isLoading}
            />
          </div>

          <div>
            <Select
              value={formData.priority}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, priority: value }))}
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low Priority</SelectItem>
                <SelectItem value="medium">Medium Priority</SelectItem>
                <SelectItem value="high">High Priority</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2 pt-2">
            <Button type="submit" disabled={!formData.todo.trim() || isLoading} className="flex-1">
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Adding...
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Task
                </>
              )}
            </Button>
            <Button type="button" variant="outline" onClick={handleCancel} disabled={isLoading}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
