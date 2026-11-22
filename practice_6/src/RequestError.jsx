export default function RequestError({ message, onRetry }) {
  return (
    <div>
      <p>Ошибка: {message}</p>
      <button onClick={onRetry}>Повторить</button>
    </div>
  );
}
