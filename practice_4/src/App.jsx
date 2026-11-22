import {Routes, Route, NavLink, Outlet, Link, useParams, } 
from 'react-router-dom';
import { books } from './books';
import BookCard from './BookCard';
import { useFavorites } from './FavoritesContext';

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
  const book = books.find((item) => item.id === Number(id));

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
      <p>
        <Link to="/">Назад в каталог</Link>
      </p>
    </section>
  );
}

export function Favorites() {
  const { favoriteIds, removeFavorite } = useFavorites();
  const favoriteBooks = books.filter((book) => favoriteIds.includes(book.id));

  if (favoriteBooks.length === 0) {
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
