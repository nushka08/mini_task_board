import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    const [rows] = await pool.query(
      "SELECT id, title, status, created_at FROM tasks ORDER BY created_at DESC"
    );

    return NextResponse.json(rows);
  } catch (error) {
    console.error("Failed to fetch tasks:", error);

    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 }
    );
  }
}
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { title, status } = body;

    if (
      typeof title !== "string" ||
      title.trim().length === 0
    ) {
      return NextResponse.json(
        { error: "Task title is required" },
        { status: 400 }
      );
    }

    const validStatuses = ["to-do", "ongoing", "done"];

    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Invalid task status" },
        { status: 400 }
      );
    }

    const [result] = await pool.execute(
      "INSERT INTO tasks (title, status) VALUES (?, ?)",
      [title.trim(), status]
    );

    return NextResponse.json(
      {
        message: "Task created successfully",
        taskId: (result as { insertId: number }).insertId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to create task:", error);

    return NextResponse.json(
      { error: "Failed to create task" },
      { status: 500 }
    );
  }
}