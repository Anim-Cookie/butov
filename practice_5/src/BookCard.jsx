import { Link } from 'react-router-dom';

export default function BookCard({ book, isFavorite, onAdd }) {
  return (
    <article>
      <h2>
        <Link to={`/books/${book.id}`}>{book.title}</Link>
      </h2>
      <p>{book.author}</p>
      <button onClick={() => onAdd(book.id)} disabled={isFavorite}>
        {isFavorite ? 'В избранном' : 'В избранное'}
      </button>
    </article>
  );
}
