import { request } from './request';

export async function getBooks(page = 1, signal) {
  const result = await request('/public/books', { page, limit: 3 }, signal);
  const items = Array.isArray(result?.data) ? result.data : (result?.data?.data || []);

  return items.slice(0, 3).map((item) => ({
    id: item.id,
    title: item.volumeInfo?.title || 'Без названия',
    author: item.volumeInfo?.authors?.join(', ') || 'Автор не указан',
  }));
}

export async function getBook(id, signal) {
  try {
    const result = await request(`/public/books/${id}`, {}, signal);
    const item = result?.data;

    if (!item) return null;

    return {
      id: item.id,
      title: item.volumeInfo?.title || 'Без названия',
      author: item.volumeInfo?.authors?.join(', ') || 'Автор не указан',
      description: item.volumeInfo?.description || 'Описание отсутствует',
    };
  } catch (err) {
    if (err.name === 'AbortError' || signal?.aborted) {
      throw err;
    }
    if (err.message.includes('404')) {
      return null;
    }
    throw err;
  }
}

export async function getFavorites(ids = [], signal) {
  if (!ids || ids.length === 0) {
    return [];
  }

  const books = await Promise.all(
    ids.map((id) => getBook(id, signal))
  );

  return books.filter(Boolean);
}
