import React from 'react';
import { Link } from 'react-router-dom';

export const RulesPage: React.FC = () => (
  <div style={{ padding: '40px' }}>
    <div style={{ width: '500px', backgroundColor: '#c0c0c0', border: '2px solid', borderColor: '#ffffff #808080 #808080 #ffffff' }}>
      <div style={{ background: 'linear-gradient(90deg, #000080, #1080d0)', padding: '4px 8px', color: '#fff', fontWeight: 'bold', fontSize: '12px' }}>
        Справка по игре
      </div>
      <div style={{ padding: '16px', color: '#000', fontSize: '13px' }}>
        <p style={{ marginTop: 0 }}>Выбирайте заказы в Чате, набирайте очки за столом Блекджека и покупайте улучшения в Офисном магазине.</p>
        <Link to="/" style={{ color: '#000080', fontWeight: 'bold' }}>← Вернуться на Рабочий стол</Link>
      </div>
    </div>
  </div>
);
