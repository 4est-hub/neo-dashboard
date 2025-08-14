import './App.css';
import { useEffect, useState } from 'react';
import DatePicker from './components/DatePicker';
import SortableList from './components/SortableList';
import type { Neo } from './types/neo';
import reactSvg from './assets/react.svg';

const SERVER_API = 'http://localhost:3000/api';

export default function App() {
  const today = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const [neos, setNeos] = useState<Neo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNeos = async () => {
      setLoading(true);
      setError(null);

      try {
        const startDate = selectedDate;
        const endDate = selectedDate;
        const res = await fetch(
          `${SERVER_API}/neos?start_date=${startDate}&end_date=${endDate}`
        );

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data: Neo[] = await res.json();
        setNeos(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNeos();
  }, [selectedDate]);

  return (
    <main>
      <h1>
        Near-Earth Objects
        <img src={reactSvg} alt="React Logo" width={50} height={50} />
      </h1>

      <section>
        <DatePicker onChange={(date) => setSelectedDate(date)} />
      </section>

      <section className="list-container">
        { loading && <p>Loading...</p> }
        { error && <p>Error: {error}</p>}
        { !(loading || error) && 
          <SortableList
            items={neos}
            sortableKeys={['size', 'closest_approach', 'velocity']}
            labelKey="name"
          />
        }
      </section>
    </main>
  );
}
