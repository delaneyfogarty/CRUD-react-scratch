import { useState, useEffect } from 'react';
import { getCats } from './services/fetch-utils';
import Cat from './Cat';

export default function ListPage() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    async function loadCats() {
      const catData = await getCats();
      setCats(catData);
    }

    loadCats();
  }, []);

  return (
    <div>
      {cats.map((cat, i) => (
        <Cat key={cat.name + i} cat={cat} />
      ))}
    </div>
  );
}
