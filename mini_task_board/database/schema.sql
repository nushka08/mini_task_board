CREATE DATABASE IF NOT EXISTS task_board;

USE task_board;

CREATE TABLE IF NOT EXISTS tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    status ENUM('to-do', 'ongoing', 'done') NOT NULL DEFAULT 'to-do',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO tasks (title, status) VALUES
('Design landing page UI', 'to-do');