import React, { useState, useEffect } from 'react';

export default function App() {

  const [spots, setSpots] = useState([0, 0, 0]);
  const [seconds, setSeconds] = useState(0);         
  const [served, setServed] = useState(0);           
  const [rejected, setRejected] = useState(0);       
  const [busyTicks, setBusyTicks] = useState(0);     
  const [totalTicks, setTotalTicks] = useState(0);   
  const [maintCost, setMaintCost] = useState(0);     

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((s) => s + 1);

      setSpots((prevSpots) => {

        const nextSpots = prevSpots.map((time) => (time > 0 ? time - 1 : 0));

        const freeIndex = nextSpots.indexOf(0);
        if (freeIndex !== -1) {
          nextSpots[freeIndex] = Math.floor(Math.random() * 6) + 5; 
          setServed((c) => c + 1);
        } else {
          setRejected((c) => c + 1); 
        }

        const busyNow = nextSpots.filter((time) => time > 0).length;
        setBusyTicks((b) => b + busyNow);
        setTotalTicks((t) => t + nextSpots.length);
        setMaintCost((cost) => cost + nextSpots.length * 20);

        return nextSpots;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const loadPercent = totalTicks > 0 ? ((busyTicks / totalTicks) * 100).toFixed(1) : 0;
  const income = served * 300;
  const buildCost = (spots.length - 3) * 100;
  const totalExpenses = buildCost + maintCost;
  const profit = income - totalExpenses;

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Парковка (прошло {seconds} сек.)</h2>

      <button onClick={() => setSpots([...spots, 0])}>
        + Добавить место (100 руб.)
      </button>

      <h3>1. Статистика работы</h3>
      <p>Обслужено: {served}</p> 
      <p>Отказов: {rejected}</p> 
      <p>Загруженность: {loadPercent}%</p>

      <h3>2. Финансовые показатели</h3>
      <p>Доход: {income} руб.</p> 
      <p>Затраты: {totalExpenses} руб.</p> 
      <p>Чистая прибыль: {profit} руб.</p>

      <h3>3. Оптимальное количество мест</h3>
      <p>Наиболее выгодно содержать <b>8 мест</b> (при среднем времени стоянки 7.5 сек и потоке 1 авто/сек).</p>

      <h3>4. Список парковочных мест (всего: {spots.length})</h3>
      <ul>
        {spots.map((time, i) => (
          <li key={i}>
            Место №{i + 1}: {time > 0 ? `Занято (осталось ${time} сек.)` : 'Свободно'}
          </li>
        ))}
      </ul>
    </div>
  );
}
