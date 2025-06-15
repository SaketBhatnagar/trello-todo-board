"use client"

import { useDrag } from "react-dnd"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Todo } from "@/types/todo"
import { Edit2, Trash2, GripVertical } from "lucide-react"

interface TodoCardProps {
  todo: Todo
  onEdit: (todo: Todo) => void
  onDelete: (id: number) => void
}

export function TodoCard({ todo, onEdit, onDelete }: TodoCardProps) {
  const [{ isDragging }, drag] = useDrag({
    type: "todo",
    item: { id: todo.id, status: todo.status },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <Card
      ref={drag}
      className={`cursor-move hover:shadow-md transition-all duration-200 ${
        isDragging ? "opacity-50 rotate-2 scale-105" : ""
      }`}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <GripVertical className="h-4 w-4 text-gray-400" />
            <h3 className="font-semibold text-gray-800 line-clamp-2">{todo.todo}</h3>
          </div>
          <div className="flex gap-1 ml-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                onEdit(todo)
              }}
              className="h-8 w-8 p-0 hover:bg-blue-100"
            >
              <Edit2 className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                onDelete(todo.id)
              }}
              className="h-8 w-8 p-0 hover:bg-red-100"
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {todo.description && <p className="text-sm text-gray-600 mb-3 line-clamp-3">{todo.description}</p>}

        <div className="flex items-center justify-between">
          <Badge className={getPriorityColor(todo.priority)}>{todo.priority}</Badge>
          <span className="text-xs text-gray-500">ID: {todo.id}</span>
        </div>
      </CardContent>
    </Card>
  )
}
