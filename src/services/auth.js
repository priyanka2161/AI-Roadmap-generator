const API_BASE = 'http://localhost:3001/api';

export async function signup({ name, email, password }) {
  const res = await fetch(`${API_BASE}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Signup failed');
  localStorage.setItem('authToken', data.token);
  localStorage.setItem('authUser', JSON.stringify(data.user));
  return data;
}

export async function login({ email, password }) {
  const res = await fetch(`${API_BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Login failed');
  localStorage.setItem('authToken', data.token);
  localStorage.setItem('authUser', JSON.stringify(data.user));
  return data;
}

export function logout() {
  localStorage.removeItem('authToken');
  localStorage.removeItem('authUser');
}

export function getToken() {
  return localStorage.getItem('authToken');
}

export function getUser() {
  const u = localStorage.getItem('authUser');
  return u ? JSON.parse(u) : null;
}

export function isLoggedIn() {
  return !!getToken();
}
