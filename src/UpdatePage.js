import { useState } from 'react';
import { getCatById, updateCat } from './services/fetch-utils';
import { useHistory, useParams } from 'react-router-dom';
import { useEffect } from 'react/cjs/react.production.min';

export default function CreatePage() {
  const history = useHistory();
  const { id } = useParams();

  const [catInForm, setCatInForm] = useState({
    name: '',
    age: 0,
    type: '',
    fav_food: '',
    zodiac: '',
  });

  useEffect(() => {
    async function loadCats() {
      const cat = await getCatById(id);
      setCatInForm(cat);
    }
    loadCats();
  }, [id]);

  async function handleUpdate(e) {
    e.preventDefault();

    await updateCat(id, catInForm);
    history.push('/cats');
  }

  return (
    <div className="update">
      <form onSubmit={handleUpdate}>
        <h2>Add a Cat!</h2>
        <label>
          Name
          <input
            required
            name="cat"
            value={catInForm.name}
            onChange={(e) => setCatInForm({ ...catInForm, name: e.target.value })}
          />
        </label>
        <label>
          Type
          <select
            required
            value={catInForm.type}
            onChange={(e) => setCatInForm({ ...catInForm, type: e.target.value })}
          >
            <option>Black Cat</option>
            <option>Tuxedo Cat</option>
            <option>Tabby Cat</option>
            <option>Grey Cat</option>
            <option>Calico Cat</option>
            <option>Siamese Cat</option>
            <option>White Cat</option>
          </select>
        </label>
        <label>
          Age
          <input
            required
            name="age"
            value={catInForm.age}
            onChange={(e) => setCatInForm({ ...catInForm, age: e.target.value })}
          />
        </label>
        <label>
          Favorite Food
          <input
            required
            name="fav_food"
            value={catInForm.fav_food}
            onChange={(e) => setCatInForm({ ...catInForm, fav_food: e.target.value })}
          />
        </label>
        <label>
          Zodiac
          <select
            required
            value={catInForm.zodiac}
            onChange={(e) => setCatInForm({ ...catInForm, zodiac: e.target.value })}
          >
            <option>Aries</option>
            <option>Taurus</option>
            <option>Gemini</option>
            <option>Cancer</option>
            <option>Leo</option>
            <option>Virgo</option>
            <option>Libra</option>
            <option>Scorpio</option>
            <option>Sagittarius</option>
            <option>Capricorn</option>
            <option>Aquarius</option>
            <option>Pisces</option>
          </select>
        </label>
        <button>Update Cat</button>
      </form>
    </div>
  );
}
