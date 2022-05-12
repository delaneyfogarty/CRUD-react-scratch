import { Link } from 'react-router-dom';

export default function Cat({ cat }) {
  return (
    <Link to={`/cats/${cat.id}`}>
      <div className="cat">
        <h3>{cat.name}</h3>
        <p>
          {' '}
          A {cat.type} that loves to eat {cat.fav_food}{' '}
        </p>
        <p>
          {' '}
          I am {cat.age} years old and a {cat.zodiac}{' '}
        </p>
      </div>
    </Link>
  );
}
