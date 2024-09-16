"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [eventos, setEventos] = useState([]);
  const [error, setError] = useState(null);
  const router = useRouter();

  const redirectoEvent = (event) => {
    router.push(`/detalleEvento?id=${event.id}`);
  };

  useEffect(() => {
    const prepareApp = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/event');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setEventos(data);
        setLoading(false);
      } catch (e) {
        setError(e.message);
        console.warn(e);
      }
    };

    prepareApp();
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Bienvenido al panel de control</p>
      {eventos.map((event) => (
        <button key={event.id} onClick={() => redirectoEvent(event)}>
          {event.name} - {event.description}
        </button>
      ))}
    </div>
  );
}
