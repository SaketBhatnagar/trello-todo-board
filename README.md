# Trello-style Todo Board

A modern, responsive Todo board application built with Next.js, TypeScript, and Tailwind CSS. This project implements a Trello-style Kanban board for managing tasks with drag-and-drop functionality.

<img width="1512" alt="Screenshot 1404-03-26 at 09 03 24" src="https://github.com/user-attachments/assets/bccafbf1-45a6-4696-8d24-77846da46c7d" />

[Demo Link](https://trello-todo-board.vercel.app/)


## Features

- 📱 Responsive design that works on both desktop and mobile
- 🎯 Drag and drop tasks between different status lanes
- ✨ Create, read, update, and delete tasks
- 🎨 Clean and intuitive user interface
- 📊 Three status lanes: Pending, In Progress, and Completed
- ⚡ Real-time updates with optimistic UI
- 🎯 Priority levels for tasks (Low, Medium, High)

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with shadcn/ui
- **State Management**: React Hooks
- **Drag and Drop**: react-dnd
- **API**: DummyJSON Todos API

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- pnpm (recommended) or npm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/trello-todo-board.git
   cd trello-todo-board
   ```

2. Install dependencies:

   ```bash
   pnpm install
   # or
   npm install
   ```

3. Start the development server:

   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

This project is configured for automatic deployment to GitHub Pages. The deployment process is handled by GitHub Actions.

### Manual Deployment

1. Build the project:

   ```bash
   npm run build
   ```

2. The build output will be in the `out` directory, which can be deployed to any static hosting service.

### Automatic Deployment

The project is automatically deployed to GitHub Pages when changes are pushed to the `main` branch. The deployment process:

1. Builds the Next.js application
2. Generates static files
3. Deploys to GitHub Pages

You can view the deployment status in the "Actions" tab of your GitHub repository.

## Project Structure

```
├── app/                 # Next.js app directory
├── components/         # React components
│   ├── todo-board.tsx  # Main board component
│   ├── todo-lane.tsx   # Status lane component
│   ├── todo-card.tsx   # Individual task card
│   └── ...
├── hooks/             # Custom React hooks
├── lib/              # Utility functions and API
├── types/            # TypeScript type definitions
└── styles/           # Global styles
```

## Design Decisions

### Architecture

- Used Next.js for its built-in optimizations and server-side capabilities
- Implemented component-based architecture for better maintainability
- Utilized custom hooks for state management and API interactions

### UI/UX

- Implemented drag-and-drop for intuitive task management
- Added visual feedback for all user interactions
- Used a clean, minimal design with clear visual hierarchy
- Implemented responsive design for all screen sizes

### Performance

- Optimistic updates for better user experience
- Efficient state management with React hooks
- Proper error handling and loading states

## Known Limitations

1. **API Limitations**:

   - DummyJSON API doesn't persist data
   - Limited to 20 todos per request
   - No real authentication

2. **Feature Limitations**:
   - No task filtering or search
   - No task due dates
   - No task assignments
   - No task labels or tags

## Future Improvements

1. **Features**:

   - Add task filtering and search
   - Implement task due dates
   - Add task assignments
   - Add task labels and tags
   - Add task comments
   - Implement task history

2. **Technical**:
   - Add real backend integration
   - Implement user authentication
   - Add data persistence
   - Add unit and integration tests
   - Implement real-time updates with WebSocket

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [DummyJSON](https://dummyjson.com/)
- [react-dnd](https://react-dnd.github.io/react-dnd/)
- [shadcn/ui](https://ui.shadcn.com/)
