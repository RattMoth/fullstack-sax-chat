import React, { useContext, useEffect, useState } from 'react';
// import AuthContext from '../../stores/authContext';
import ReactLoading from 'react-loading';
import SetlistContext from '../../stores/setlistContext';
import CategoryCard from '../lib/CategoryCard/CategoryCard';
import Navbar from '../lib/Navbar/Navbar';
import './Main.css';

export default function Main() {
  // const { user, login } = useContext(AuthContext);
  const { setlistSongs, setSetlistSongs } = useContext(SetlistContext);
  const [categories, setCategories] = useState(undefined);

  // TODO reactivate this. Disabled to prevent extra DB calls
  useEffect(() => {
    // fetch('/.netlify/functions/get-all-categories')
    //   .then((res) => res.json())
    //   .then((data) => setCategories(data))
    //   // eslint-disable-next-line no-console
    //   .catch((error) => console.error);
    setCategories(['Anime', 'Disney', 'TV and Movies', 'Video Games']);
  }, []);

  return (
    <div id="mainContainer" className="grid">
      <header>
        <Navbar categories={categories} />
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
        {categories ? (
          categories.map((category) => <CategoryCard category={category} />)
        ) : (
          // <ReactLoading type="spin" color="#3f51b5" />
          <div>still loadin</div>
        )}
      </article>

      {/* <aside className="sidebar-right">Right Sidebar</aside> */}

      <footer>Footer</footer>
    </div>
  );
}
