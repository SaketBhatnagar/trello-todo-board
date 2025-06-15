'use client';

import { useDrop } from 'react-dnd';
import { TodoCard } from './todo-card';
import type { Todo, TodoStatus } from '@/types/todo';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface TodoLaneProps {
  status: TodoStatus;
  title: string;
  color: string;
  todos: Todo[];
  onEditTodo: (todo: Todo) => void;
  onDeleteTodo: (id: number) => void;
  onMoveTodo: (todoId: number, newStatus: TodoStatus) => void;
}

export function TodoLane({
  status,
  title,
  color,
  todos,
  onEditTodo,
  onDeleteTodo,
  onMoveTodo,
}: TodoLaneProps) {
  const [{ isOver }, drop] = useDrop({
    accept: 'todo',
    drop: (item: { id: number; status: TodoStatus }) => {
      if (item.status !== status) {
        onMoveTodo(item.id, status);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div ref={drop as any}>
      <Card
        className={`${color} ${
          isOver ? 'ring-2 ring-blue-400 ring-opacity-50' : ''
        } transition-all duration-200 min-h-[400px]`}
      >
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold text-gray-700 flex items-center justify-between">
            {title}
            <span className="text-sm font-normal bg-white px-2 py-1 rounded-full">
              {todos.length}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {todos.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <p className="text-sm">No tasks in {title.toLowerCase()}</p>
              <p className="text-xs mt-1">Drag tasks here or add new ones</p>
            </div>
          ) : (
            todos.map((todo) => (
              <TodoCard
                key={todo.id}
                todo={todo}
                onEdit={onEditTodo}
                onDelete={onDeleteTodo}
              />
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
