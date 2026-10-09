"use client";

import { useEffect, useState } from "react";
import { Task, TaskStatus } from "@/types/task";
export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const [title, setTitle] = useState("");
  const [status, setStatus] = useState<TaskStatus>("to-do");

  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const [error, setError] = useState("");

  async function fetchTasks() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/tasks");

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch tasks");
      }

      setTasks(data);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  async function handleAddTask(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");

    if (!title.trim()) {
      setError("Task title is required.");
      return;
    }

    try {
      setAdding(true);

      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title.trim(),
          status,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create task");
      }
      setTitle("");
      setStatus("to-do");

      await fetchTasks();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );
    } finally {
      setAdding(false);
    }
  }

  async function handleStatusChange(
    taskId: number,
    newStatus: TaskStatus
  ) {
    try {
      setUpdatingId(taskId);
      setError("");

      const response = await fetch(`/api/tasks/${taskId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to update task"
        );
      }

      await fetchTasks();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );
    } finally {
      setUpdatingId(null);
    }
  }
  return (
    <main className="container">
      <div className="header">
        <h1>Mini Task Board</h1>

        <p>
          Create tasks and track their progress.
        </p>
      </div>

      <form
        onSubmit={handleAddTask}
        className="task-form"
      >
        <input
          type="text"
          placeholder="Enter a task..."
          value={title}
          onChange={(event) =>
            setTitle(event.target.value)
          }
          disabled={adding}
        />

        <select
          value={status}
          onChange={(event) =>
            setStatus(
              event.target.value as TaskStatus
            )
          }
          disabled={adding}
        >
          <option value="to-do">To-do</option>
          <option value="ongoing">
            Ongoing
          </option>
          <option value="done">Done</option>
        </select>

        <button
          type="submit"
          disabled={adding}
        >
          {adding ? "Adding..." : "Add Task"}
        </button>
      </form>

      {error && (
        <div className="error">
          {error}
        </div>
      )}

      <section className="tasks-section">
        <div className="section-header">
          <h2>Tasks</h2>

          <span>
            {tasks.length}{" "}
            {tasks.length === 1 ? "task" : "tasks"}
          </span>
        </div>

        {loading && (
          <p className="message">
            Loading tasks...
          </p>
        )}

        {!loading && tasks.length === 0 && (
          <p className="message">
            No tasks yet. Add your first task!
          </p>
        )}

        {!loading && tasks.length > 0 && (
          <div className="task-list">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="task-card"
              >
                <div className="task-content">
                  <h3>{task.title}</h3>

                  <small>
                    Created{" "}
                    {new Date(
                      task.created_at
                    ).toLocaleString()}
                  </small>
                </div>

                <select
                  value={task.status}
                  disabled={
                    updatingId === task.id
                  }
                  onChange={(event) =>
                    handleStatusChange(
                      task.id,
                      event.target.value as TaskStatus
                    )
                  }
                >
                  <option value="to-do">
                    To-do
                  </option>

                  <option value="ongoing">
                    Ongoing
                  </option>

                  <option value="done">
                    Done
                  </option>
                </select>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}