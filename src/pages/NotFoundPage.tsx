import React from 'react';
import { Link } from 'react-router-dom';

export const NotFoundPage: React.FC = () => (
  <div style={{ backgroundColor: '#000080', color: '#ffffff', minHeight: '100vh', padding: '50px', fontFamily: 'monospace' }}>
    <h1>ОШИБКА 404 — Страница не найдена</h1>
    <p>Указанный путь не существует.</p>
    <Link to="/" style={{ color: '#ffff00' }}>[ Вернуться на главную страницу ]</Link>
  </div>
);
