import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../stores/authContext';
import SetlistContext from '../../stores/setlistContext';
import CategoryCard from '../lib/CategoryCard/CategoryCard';
import './Main.css';

export default function Main() {
  const { user, login } = useContext(AuthContext);
  const { setlistSongs, setSetlistSongs } = useContext(SetlistContext);
  const [categories, setCategories] = useState([
    'Anime',
    'Disney',
    'TV and Movies',
    'Video Games',
  ]);

  // TODO reactivate this. Disabled to prevent extra DB calls
  // useEffect(() => {
  //   fetch('/.netlify/functions/get-all-categories')
  //     .then((res) => res.json())
  //     .then((data) => setCategories(data));
  // }, []);

  return (
    <div id="mainContainer" className="grid">
      <header>
        <h2>Mainpage for {user.user_metadata.full_name}</h2>
        <button type="button" onClick={login}>
          Logout
        </button>
      </header>

      <aside className="sidebar-left">
        <div>
          <h3>Setlist</h3>
          <ul>
            {setlistSongs?.map((song) => (
              <li>{song}</li>
            ))}
          </ul>
        </div>
      </aside>

      <article>
        {categories.map((category) => (
          <CategoryCard category={category} />
        ))}
      </article>

      {/* <aside className="sidebar-right">Right Sidebar</aside> */}

      <footer>Footer</footer>
    </div>
  );
}
