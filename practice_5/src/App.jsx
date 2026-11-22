import { Routes, Route, NavLink, Outlet, Link, useParams } from 'react-router-dom';
import BookCard from './BookCard';
import RequestError from './RequestError';
import { useFavorites } from './FavoritesContext';
import { useLoad } from './useLoad';
import { getBooks, getBook, getFavorites } from './api';

export function Menu() {
  const { favoriteIds } = useFavorites();

  return (
    <header>
      <nav style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
        <NavLink to="/" end>
          Каталог
        </NavLink>
        <NavLink to="/favorites">Избранное ({favoriteIds.length})</NavLink>
      </nav>
    </header>
  );
}

export function Layout() {
  return (
    <div>
      <Menu />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export function Catalog() {
  const { favoriteIds, addFavorite } = useFavorites();
  const { data: books, loading, error, reload } = useLoad(getBooks, 1);

  if (loading) {
    return (
      <section>
        <h1>Книги</h1>
        <p>Загрузка...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <h1>Книги</h1>
        <RequestError message={error} onRetry={reload} />
      </section>
    );
  }

  if (!books || books.length === 0) {
    return (
      <section>
        <h1>Книги</h1>
        <p>Книг пока нет</p>
      </section>
    );
  }

  return (
    <section>
      <h1>Книги</h1>
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          isFavorite={favoriteIds.includes(book.id)}
          onAdd={addFavorite}
        />
      ))}
    </section>
  );
}

export function BookPage() {
  const { id } = useParams();
  const { favoriteIds, addFavorite } = useFavorites();
  const { data: book, loading, error, reload } = useLoad(getBook, id);

  if (loading) {
    return (
      <section>
        <p>Загрузка...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <RequestError message={error} onRetry={reload} />
        <p>
          <Link to="/">Назад в каталог</Link>
        </p>
      </section>
    );
  }

  if (!book) {
    return (
      <section>
        <h1>Книга не найдена</h1>
        <Link to="/">Вернуться в каталог</Link>
      </section>
    );
  }

  return (
    <section>
      <BookCard
        book={book}
        isFavorite={favoriteIds.includes(book.id)}
        onAdd={addFavorite}
      />
      <p>{book.description}</p>
      <p>
        <Link to="/">Назад в каталог</Link>
      </p>
    </section>
  );
}


export function Favorites() {
  const { favoriteIds, removeFavorite } = useFavorites();
  const { data: favoriteBooks, loading, error, reload } = useLoad(getFavorites, favoriteIds);

  if (loading) {
    return (
      <section>
        <h1>Избранное</h1>
        <p>Загрузка...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <h1>Избранное</h1>
        <RequestError message={error} onRetry={reload} />
      </section>
    );
  }

  if (!favoriteBooks || favoriteBooks.length === 0) {
    return (
      <section>
        <h1>Избранное</h1>
        <p>Избранное пусто</p>
      </section>
    );
  }

  return (
    <section>
      <h1>Избранное ({favoriteBooks.length})</h1>
      <ul>
        {favoriteBooks.map((book) => (
          <li key={book.id}>
            {book.title} - {book.author}{' '}
            <button onClick={() => removeFavorite(book.id)}>Удалить</button>
          </li>
        ))}
      </ul>
    </section>
  );
}


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Catalog />} />
        <Route path="books/:id" element={<BookPage />} />
        <Route path="favorites" element={<Favorites />} />
      </Route>
    </Routes>
  );
}

export default App;
