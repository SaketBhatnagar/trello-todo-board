import { TodoBoard } from "@/components/todo-board"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="container mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Todo Board</h1>
          <p className="text-gray-600">Manage your tasks with a Trello-style Kanban board</p>
        </header>
        <TodoBoard />
      </div>
    </main>
  )
}
