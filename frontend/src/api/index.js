// src/api/index.js
const BASE_URL = "/backend";

/**
 * Check current session
 */
export async function checkSession() {
  const res = await fetch(`${BASE_URL}/check_session`, {
    credentials: "include"
  });
  if (!res.ok) throw new Error("Not authenticated");
  return res.json();
}

/**
 * Signup
 */
export async function signup(username, password) {
  const res = await fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
    credentials: "include"
  });
  if (!res.ok) throw new Error("Signup failed");
  return res.json();
}

/**
 * Login
 */
export async function login(username, password) {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
    credentials: "include"
  });
  if (!res.ok) throw new Error("Login failed");
  return res.json();
}

/**
 * Logout
 */
export async function logout() {
  const res = await fetch(`${BASE_URL}/logout`, {
    method: "DELETE",
    credentials: "include"
  });
  if (!res.ok) throw new Error("Logout failed");
  return true;
}

/**
 * Get all todo lists for current user
 */
export async function getLists() {
  const res = await fetch(`${BASE_URL}/lists`, {
    credentials: "include"
  });
  if (!res.ok) throw new Error("Failed to fetch lists");
  return res.json();
}

/**
 * Add a new todo list
 */
export async function addList(name) {
  const res = await fetch(`${BASE_URL}/lists`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
    credentials: "include"
  });
  if (!res.ok) throw new Error("Failed to add list");
  return res.json();
}

/**
 * Get tasks for a list
 */
export async function getTasks(listId) {
  const res = await fetch(`${BASE_URL}/tasks?list_id=${listId}`, {
    credentials: "include"
  });
  if (!res.ok) throw new Error("Failed to fetch tasks");
  return res.json();
}

/**
 * Add a new task
 */
export async function addTask(title, listId, parentId = null) {
  const res = await fetch(`${BASE_URL}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, list_id: listId, parent_id: parentId }),
    credentials: "include"
  });
  if (!res.ok) throw new Error("Failed to add task");
  return res.json();
}

/**
 * Update a task (mark completed, rename, etc.)
 */
export async function updateTask(id, data) {
  const res = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include"
  });
  if (!res.ok) throw new Error("Failed to update task");
  return res.json();
}

/**
 * Delete a task
 */
export async function deleteTask(id) {
  const res = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: "DELETE",
    credentials: "include"
  });
  if (!res.ok) throw new Error("Failed to delete task");
  return true;
}