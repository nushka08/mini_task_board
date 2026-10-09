# Mini Task Board

A simple full-stack task management application.

The application allows users to:

- View all tasks
- Create new tasks
- Set or update a task status
- Handle loading and error states

## Tech Stack

- Next.js
- React.js
- TypeScript
- Node.js
- MySQL

## Project Structure

mini-task-board/
├── app/
│   ├── api/
│   │   └── tasks/
│   │       ├── route.ts
│   │       └── [id]/
│   │           └── route.ts
│   ├── page.tsx
│   ├── layout.tsx
│   └── globals.css
├── lib/
│   └── db.ts
├── types/
│   └── task.ts
├── database/
│   └── schema.sql
├── .env.local
├── .gitignore
├── package.json
└── README.md

## Backend Approach

I used Next.js API Routes for the backend instead of a separate Express server.

## Features
Create Tasks
Users can create a task by entering a title and selecting a status.

Available statuses:
-To-do
-Ongoing
-Done

Task titles cannot be empty.

View Tasks
Tasks are retrieved from the MySQL database and displayed on the main page.

Update Task Status
Users can change the status of an existing task directly from the task list.

Validation
Input validation is performed on both the frontend and backend.

The backend validates:

-Task title is not empty
-Task status is valid
-Task ID is valid
-Loading and Error States

The application handles:

-Loading tasks
-Adding a task
-Updating a task
-API/database errors
-Empty task lists

## Database
The application uses MySQL with a single tasks table containing:

Column     |	Type	 |  Description
----------------------------------------------
id	       |    INT      |  Primary key
title      |VARCHAR(255) |  Task title
status     |   ENUM	     |  Task status
created_at |  TIMESTAMP  |  Task creation time

The database schema is available at:
database/schema.sql


## Create a .env.local file in the project root:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=mini_task_board
DB_PORT=3306

## Getting Started

1. Clone the repository
git clone https://github.com/nushka08/mini-task-board
cd mini-task-board

2. Install dependencies
npm install

3. Set up the MySQL database

Open MySQL Workbench and run:
database/schema.sql

4. Replace .env.local in the project root and add:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=mini_task_board
DB_PORT=3306

5. Start the server
npm run dev

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Author

** Anushka Mishra **
Linkedin: https://linkedin.com/in/anushka-mishra-
GitHub: https://github.com/nushka08

