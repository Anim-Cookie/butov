import React, { useState, useEffect } from 'react';
import { getClientsMock, type ClientContract } from '../mocks/clientsMock';

interface WindowState {
  id: string;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
}

export const MainPage: React.FC = () => {
  const [clients, setClients] = useState<ClientContract[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [playerGold, setPlayerGold] = useState<number>(100);
  const [blackjackLogs, setBlackjackLogs] = useState<string[]>(["Система инициализирована..."]);
  const [currentScore, setCurrentScore] = useState<number>(0);

  const [windows, setWindows] = useState<Record<string, WindowState>>({
    contracts: { id: 'contracts', title: 'Менеджер контрактов', isOpen: true, isMinimized: false, x: 50, y: 80, width: 550, height: 400 },
    blackjack: { id: 'blackjack', title: 'Стол Блекджека', isOpen: false, isMinimized: false, x: 200, y: 150, width: 450, height: 350 },
    shop:      { id: 'shop',      title: 'Офисный Магазин', isOpen: false, isMinimized: false, x: 120, y: 200, width: 400, height: 300 },
    mines:     { id: 'mines',     title: 'Сапер', isOpen: false, isMinimized: false, x: 300, y: 100, width: 350, height: 350 }
  });

  const [activeWindow, setActiveWindow] = useState<string>('contracts');
  const [draggedWindow, setDraggedWindow] = useState<{ id: string; startX: number; startY: number } | null>(null);
  const [resizedWindow, setResizedWindow] = useState<{ id: string; startWidth: number; startHeight: number; startX: number; startY: number } | null>(null);

  useEffect(() => {
    getClientsMock().then((data) => {
      setClients(data);
      setIsLoading(false);
    });

    const handleMouseMove = (e: MouseEvent) => {
      if (draggedWindow) {
        setWindows(prev => ({
          ...prev,
          [draggedWindow.id]: {
            ...prev[draggedWindow.id],
            x: prev[draggedWindow.id].x + (e.clientX - draggedWindow.startX),
            y: prev[draggedWindow.id].y + (e.clientY - draggedWindow.startY)
          }
        }));
        setDraggedWindow(prev => prev ? { ...prev, startX: e.clientX, startY: e.clientY } : null);
      }
      if (resizedWindow) {
        setWindows(prev => ({
          ...prev,
          [resizedWindow.id]: {
            ...prev[resizedWindow.id],
            width: Math.max(250, resizedWindow.startWidth + (e.clientX - resizedWindow.startX)),
            height: Math.max(200, resizedWindow.startHeight + (e.clientY - resizedWindow.startY))
          }
        }));
      }
    };

    const handleMouseUp = () => {
      setDraggedWindow(null);
      setResizedWindow(null);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [draggedWindow, resizedWindow]);


  const openWindow = (id: string) => {
    setWindows(prev => ({ ...prev, [id]: { ...prev[id], isOpen: true, isMinimized: false } }));
    setActiveWindow(id);
  };

  const closeWindow = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setWindows(prev => ({ ...prev, [id]: { ...prev[id], isOpen: false } }));
  };


  const playCard = () => {
    const randomCard = Math.floor(Math.random() * 10) + 2;
    const newScore = currentScore + randomCard;
    setCurrentScore(newScore);
    setBlackjackLogs(prev => [`Взята карта: ${randomCard} (Всего очков: ${newScore})`, ...prev]);
  };

  const standHand = () => {
    setBlackjackLogs(prev => [`Рука завершена на счете ${currentScore}. Текст отправлен соискателю!`, ...prev]);
    setCurrentScore(0);
    setPlayerGold(prev => prev + 50);
  };

  return (
    <div style={{ backgroundColor: '#008080', minHeight: '100%', position: 'relative', overflow: 'hidden', fontFamily: '"MS Sans Serif", Arial', userSelect: 'none' }}>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '25px', padding: '20px', width: '90px' }}>

        <div onClick={() => openWindow('contracts')} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img src="public/icons/chat_test.png" width="32" height="32" style={{ imageRendering: 'pixelated' }} alt="Contracts" />
          <span style={{ color: '#ffffff', fontSize: '12px', textAlign: 'center', marginTop: '4px', textShadow: '1px 1px #000000' }}>Чат</span>
        </div>

        <div onClick={() => openWindow('blackjack')} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img src="public/icons/BJ_test.png" width="32" height="32" style={{ imageRendering: 'pixelated' }}  alt="Blackjack" />
          <span style={{ color: '#ffffff', fontSize: '12px', textAlign: 'center', marginTop: '4px', textShadow: '1px 1px #000000' }}>Блекджек</span>
        </div>

        <div onClick={() => openWindow('shop')} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img src="public/icons/shopt_test.png" width="32" height="32" style={{ imageRendering: 'pixelated' }}  alt="Shop" />
          <span style={{ color: '#ffffff', fontSize: '12px', textAlign: 'center', marginTop: '4px', textShadow: '1px 1px #000000' }}>Магазин</span>
        </div>

        <div onClick={() => openWindow('mines')} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img src="public/icons/mines_mine.png" width="32" height="32" style={{ imageRendering: 'pixelated' }} alt="Mines" />
          <span style={{ color: '#ffffff', fontSize: '12px', textAlign: 'center', marginTop: '4px', textShadow: '1px 1px #000000' }}>Сапер</span>
        </div>
      </div>

      {Object.values(windows).map((win) => {
        if (!win.isOpen) return null;
        const isActive = activeWindow === win.id;

        return (
          <div
            key={win.id}
            onClick={() => setActiveWindow(win.id)}
            style={{
              position: 'absolute',
              left: `${win.x}px`,
              top: `${win.y}px`,
              width: `${win.width}px`,
              height: `${win.height}px`,
              backgroundColor: '#c0c0c0',
              border: '2px solid',
              borderColor: '#ffffff #808080 #808080 #ffffff',
              display: 'flex',
              flexDirection: 'column',
              zIndex: isActive ? 100 : 10,
              boxShadow: 'none'
            }}
          >
            <div
              onMouseDown={(e) => setDraggedWindow({ id: win.id, startX: e.clientX, startY: e.clientY })}
              style={{
                background: isActive ? 'linear-gradient(90deg, #000080, #1080d0)' : '#808080',
                padding: '4px 8px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                cursor: 'move'
              }}
            >
              <span style={{ color: '#ffffff', fontWeight: 'bold', fontSize: '12px' }}>{win.title}</span>
              <button 
                onClick={(e) => closeWindow(win.id, e)}
                style={{ width: '16px', height: '14px', fontSize: '9px', fontWeight: 'bold', backgroundColor: '#c0c0c0', border: '1px solid', borderColor: '#ffffff #808080 #808080 #ffffff', padding: '0', cursor: 'pointer' }}
              >
                X
              </button>
            </div>

            <div style={{ padding: '12px', flexGrow: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', color: '#000' }}>
              
              {win.id === 'contracts' && (
                isLoading ? <div>Загрузка Dial-Up...</div> : (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    {clients.map(c => (
                      <div key={c.id} style={{ border: '2px inset #fff', padding: '8px', background: '#e0e0e0' }}>
                        <b>{c.companyName}</b>
                        <div style={{ fontSize: '11px', marginTop: '4px' }}>Символов: {c.requiredChars} | Рук: {c.maxHands}</div>
                        <button onClick={() => openWindow('blackjack')} style={{ marginTop: '8px', fontSize: '11px' }}>Выбрать</button>
                      </div>
                    ))}
                  </div>
                )
              )}

              {win.id === 'blackjack' && (
                <div>
                  <div style={{ background: '#005500', color: '#fff', padding: '15px', borderRadius: '4px', textAlign: 'center', fontWeight: 'bold', border: '2px inset #000' }}>
                    Счёт текущей руки: {currentScore}
                  </div>
                  <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                    <button onClick={playCard} style={{ flex: 1, fontWeight: 'bold', padding: '6px' }}>[ ЕЩЕ КАРТУ ]</button>
                    <button onClick={standHand} style={{ flex: 1, padding: '6px' }}>[ ХВАТИТ ]</button>
                  </div>
                  <div style={{ marginTop: '10px', backgroundColor: '#fff', border: '2px inset #808080', height: '120px', overflowY: 'auto', padding: '6px', fontSize: '11px' }}>
                    {blackjackLogs.map((log, i) => <div key={i}>&gt; {log}</div>)}
                  </div>
                                   </div>
              )}

              {win.id === 'shop' && (
                <div style={{ fontSize: '13px' }}>
                  <p style={{ margin: '0 0 10px 0' }}>Доступные апгрейды для кабинета HR:</p>
                  <div style={{ border: '2px inset #ffffff', padding: '6px', background: '#eeeeee', marginBottom: '6px' }}>
                    Механическая клавиатура (+5 к клику) — <b>200 GOLD</b>
                  </div>
                  <div style={{ border: '2px inset #ffffff', padding: '6px', background: '#eeeeee' }}>
                    Кофемашина (Доп. Сброс карт) — <b>450 GOLD</b>
                  </div>
                </div>
              )}

              {win.id === 'mines' && (
                <div style={{ textAlign: 'center', padding: '20px', border: '2px inset #ffffff', background: '#f0f0f0' }}>
                  <span>Мини-игра «Минное поле»</span>
                  <p style={{ fontSize: '12px', margin: '8px 0' }}>Тратишь 50 GOLD на допуск. При разминировании сервера получаешь х3 золота.</p>
                  <button onClick={() => alert('Сапер генерируется...')} style={{ fontWeight: 'bold', cursor: 'pointer' }}>[ Запустить сканирование ]</button>
                </div>
              )}

            </div>

            <div
              onMouseDown={(e) => {
                e.stopPropagation();
                setResizedWindow({ id: win.id, startWidth: win.width, startHeight: win.height, startX: e.clientX, startY: e.clientY });
              }}
              style={{ width: '12px', height: '12px', position: 'absolute', right: '0', bottom: '0', cursor: 'se-resize', background: 'linear-gradient(135deg, transparent 40%, #808080 40%, #808080 60%, transparent 60%)' }}
            />
          </div>
        );
      })}

      <div style={{ position: 'absolute', bottom: '0', left: '0', right: '0', height: '36px', backgroundColor: '#c0c0c0', borderTop: '2px solid #ffffff', display: 'flex', alignItems: 'center', padding: '2px 6px', gap: '8px', zIndex: 9999 }}>
        <button style={{ fontWeight: 'bold', height: '28px', backgroundColor: '#c0c0c0', border: '2px solid', borderColor: '#ffffff #808080 #808080 #ffffff', display: 'flex', alignItems: 'center', gap: '4px', padding: '2px 8px', cursor: 'pointer', color: '#000000' }}>
          <span></span> Пуск
        </button>
        
        <div style={{ height: '24px', width: '2px', backgroundColor: '#808080', borderRight: '1px solid #ffffff' }} />

        <div style={{ display: 'flex', gap: '4px', overflowX: 'auto', flexGrow: 1 }}>
          {Object.values(windows).map(w => w.isOpen && (
            <button
              key={w.id}
              onClick={() => openWindow(w.id)}
              style={{ height: '28px', backgroundColor: activeWindow === w.id ? '#e0e0e0' : '#c0c0c0', border: '2px solid', borderColor: activeWindow === w.id ? '#808080 #ffffff #ffffff #808080' : '#ffffff #808080 #808080 #ffffff', fontSize: '11px', cursor: 'pointer', color: '#000000', padding: '2px 6px' }}
            >
              {w.title.split(' ')[0]} {w.title.split(' ')[1]}
            </button>
          ))}
        </div>

        <div style={{ marginLeft: 'auto', border: '2px inset #ffffff', padding: '4px 8px', fontSize: '12px', color: '#000000', backgroundColor: '#c0c0c0', display: 'flex', gap: '10px' }}>
          <span>{playerGold} USD</span>
          <span>17:45</span>
        </div>
      </div>

    </div>
  );
};
