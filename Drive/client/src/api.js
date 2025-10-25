const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api';

export async function getProviders() {
  const res = await fetch(`${API_BASE}/providers`);
  return res.json();
}

export async function list(providerId, path = '/') {
  const url = new URL(`${API_BASE}/${providerId}/list`);
  url.searchParams.set('path', path);
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export function downloadUrl(providerId, path) {
  const url = new URL(`${API_BASE}/${providerId}/download`);
  url.searchParams.set('path', path);
  return url.toString();
}
