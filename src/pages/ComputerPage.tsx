import React from 'react';
import { Link } from 'react-router-dom';

export const ComputerPage: React.FC = () => (
  <div style={{ padding: '40px' }}>
    <div style={{ width: '500px', backgroundColor: '#c0c0c0', border: '2px solid', borderColor: '#ffffff #808080 #808080 #ffffff' }}>
      <div style={{ background: 'linear-gradient(90deg, #000080, #1080d0)', padding: '4px 8px', color: '#fff', fontWeight: 'bold', fontSize: '12px' }}>
        Мой компьютер — Системные настройки
      </div>
      <div style={{ padding: '16px', color: '#000', fontSize: '13px' }}>
        <p style={{ marginTop: 0 }}>Параметры системы, звука модема и оформления рабочего стола:</p>
        <ul>
          <li>Звуковые эффекты: Вкл.</li>
          <li>Режим экрана: 800x600 (16 бит)</li>
        </ul>
        <div style={{ display: 'flex', gap: '15px', marginTop: '16px' }}>
          <Link to="/rules" style={{ color: '#000080' }}>Открыть Справку →</Link>
          <Link to="/stats" style={{ color: '#000080' }}>Открыть Статистику →</Link>
          <Link to="/" style={{ color: '#000080', fontWeight: 'bold' }}>На Рабочий стол</Link>
        </div>
      </div>
    </div>
  </div>
);
