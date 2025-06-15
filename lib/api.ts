const API_BASE = 'https://dummyjson.com';

export interface ApiTodo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

export interface CreateTodoRequest {
  todo: string;
  completed?: boolean;
  userId?: number;
}

import type { Todo, TodoStatus } from '@/types/todo';

// Map API todo to our Todo type
function mapApiTodoToTodo(apiTodo: ApiTodo): Todo {
  return {
    id: apiTodo.id,
    todo: apiTodo.todo,
    description: '', // API doesn't provide description
    priority: 'medium', // Default priority
    status: apiTodo.completed ? 'completed' : ('pending' as TodoStatus),
    completed: apiTodo.completed,
    userId: apiTodo.userId,
  };
}

// Generate a random ID for new todos (since we're using a dummy API)
function generateTempId(): number {
  return Date.now() + Math.floor(Math.random() * 1000);
}

export const todoApi = {
  async getTodos(): Promise<Todo[]> {
    try {
      const response = await fetch(`${API_BASE}/todos?limit=20`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      // Map API todos to our format and distribute across statuses
      const todos = data.todos.map((apiTodo: ApiTodo, index: number) => {
        const todo = mapApiTodoToTodo(apiTodo);

        // Distribute todos across different statuses for demo purposes
        if (index % 3 === 0) {
          todo.status = 'pending';
        } else if (index % 3 === 1) {
          todo.status = 'in-progress';
        } else {
          todo.status = 'completed';
        }

        // Add some variety to priorities
        const priorities = ['low', 'medium', 'high'];
        todo.priority = priorities[index % 3];

        // Add sample descriptions for some todos
        if (index % 2 === 0) {
          todo.description = `This is a sample description for task: ${todo.todo}`;
        }

        return todo;
      });

      return todos;
    } catch (error) {
      console.error('Error fetching todos:', error);
      throw new Error('Failed to fetch todos from API');
    }
  },

  async createTodo(todoData: {
    todo: string;
    description?: string;
    priority: string;
  }): Promise<Todo> {
    try {
      // Since DummyJSON doesn't persist data, we'll simulate the API call
      const response = await fetch(`${API_BASE}/todos/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          todo: todoData.todo,
          completed: false,
          userId: 1,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Create our todo object with the provided data
      const newTodo: Todo = {
        id: generateTempId(), // Use temp ID since API doesn't persist
        todo: todoData.todo,
        description: todoData.description || '',
        priority: todoData.priority,
        status: 'pending',
        completed: false,
        userId: 1,
      };

      return newTodo;
    } catch (error) {
      console.error('Error creating todo:', error);
      throw new Error('Failed to create todo');
    }
  },

  async updateTodo(id: number, updates: Partial<Todo>): Promise<Partial<Todo>> {
    try {
      // Simulate API call to DummyJSON
      const response = await fetch(`${API_BASE}/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          completed: updates.status === 'completed',
          todo: updates.todo,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Return the merged updates with the API response
      return {
        ...updates,
        completed: data.completed,
        todo: data.todo,
      };
    } catch (error) {
      console.error('Error updating todo:', error);
      // Return the updates anyway since we're using a dummy API
      return updates;
    }
  },

  async deleteTodo(id: number): Promise<void> {
    try {
      const response = await fetch(`${API_BASE}/todos/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
      throw new Error('Failed to delete todo');
    }
  },
};
