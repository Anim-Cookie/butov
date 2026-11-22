import { BASE_URL } from './config';

export async function request(endpoint, params = {}, signal) {
  const url = new URL(`${BASE_URL}${endpoint}`);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, value);
    }
  });

  const response = await fetch(url.toString(), { signal });

  if (!response.ok) {
    throw new Error(`Ошибка HTTP: ${response.status}`);
  }

  return response.json();
}
