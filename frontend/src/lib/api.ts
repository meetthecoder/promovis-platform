const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export async function fetchAPI<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
    next: { revalidate: 3600 }, // Cache for 1 hour (ISR)
  });

  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

// Example usage in a page:
// const services = await fetchAPI<Service[]>('/services/');
