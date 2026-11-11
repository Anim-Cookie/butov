import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

export const Layout: React.FC = () => {
  const navStyle = ({ isActive }: { isActive: boolean }): React.CSSProperties => ({
    padding: '2px 10px',
    textDecoration: 'none',
    fontSize: '12px',
    color: isActive ? '#ffffff' : '#000000',
    backgroundColor: isActive ? '#000080' : '#c0c0c0',
    border: '2px solid',
    borderColor: isActive ? '#808080 #ffffff #ffffff #808080' : '#ffffff #808080 #808080 #ffffff',
    fontWeight: isActive ? 'bold' : 'normal',
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden', fontFamily: '"MS Sans Serif", Arial, sans-serif' }}>
      <nav style={{
        backgroundColor: '#c0c0c0',
        borderBottom: '2px solid #808080',
        padding: '4px 8px',
        display: 'flex',
        gap: '8px',
        alignItems: 'center',
        zIndex: 10000,
      }}>
        <NavLink to="/" style={navStyle} end>Рабочий стол</NavLink>
        <NavLink to="/computer" style={navStyle}>Мой компьютер (Настройки)</NavLink>
        <NavLink to="/rules" style={navStyle}>Справка</NavLink>
        <NavLink to="/stats" style={navStyle}>Статистика</NavLink>
      </nav>

      <div style={{ flexGrow: 1, backgroundColor: '#008080', position: 'relative', overflow: 'hidden' }}>
        <Outlet />
      </div>
    </div>
  );
};
