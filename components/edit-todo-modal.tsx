"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Todo } from "@/types/todo"
import { Save, Loader2 } from "lucide-react"

interface EditTodoModalProps {
  todo: Todo
  onSave: (updatedTodo: Partial<Todo>) => Promise<void>
  onClose: () => void
}

export function EditTodoModal({ todo, onSave, onClose }: EditTodoModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    todo: todo.todo,
    description: todo.description || "",
    priority: todo.priority,
  })

  useEffect(() => {
    setFormData({
      todo: todo.todo,
      description: todo.description || "",
      priority: todo.priority,
    })
  }, [todo])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.todo.trim()) return

    setIsLoading(true)
    try {
      await onSave({
        todo: formData.todo.trim(),
        description: formData.description.trim() || undefined,
        priority: formData.priority,
      })
    } catch (error) {
      console.error("Failed to update todo:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              placeholder="Task title *"
              value={formData.todo}
              onChange={(e) => setFormData((prev) => ({ ...prev, todo: e.target.value }))}
              className="text-lg font-medium"
              disabled={isLoading}
            />
          </div>

          <div>
            <Textarea
              placeholder="Description (optional)"
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              className="min-h-[100px] resize-none"
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

          <div className="flex gap-2 pt-4">
            <Button type="submit" disabled={!formData.todo.trim() || isLoading} className="flex-1">
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
            <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
