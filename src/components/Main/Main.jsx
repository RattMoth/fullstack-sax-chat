import React, { useContext, useEffect, useState } from 'react';
// import AuthContext from '../../stores/authContext';
import ReactLoading from 'react-loading';
import SetlistContext from '../../stores/setlistContext';
import CategoryCard from '../lib/CategoryCard/CategoryCard';
import Navbar from '../lib/Navbar/Navbar';
import './Main.css';

export default function Main() {
  // const { user, login } = useContext(AuthContext);
  const [allSongsObj, setAllSongsObj] = useState({});
  const { setlistSongs, setSetlistSongs } = useContext(SetlistContext);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // fetch categories, await value, store in state
    // once categories are stored, iterate over state array and fetch songs

    const fetchData = async () => {
      // Fetch categories and wait for array to be returned
      const categoriesRes = await fetch(
        '/.netlify/functions/get-all-categories'
      );
      const categoriesArr = await categoriesRes.json();
      // eslint-disable-next-line no-debugger
      debugger;
      setCategories([...categoriesArr]);

      // Now that categories are loaded, iterate through array and fetch songs
      // eslint-disable-next-line no-restricted-syntax
      for (const category of categoriesArr) {
        const categoryURL = category.replaceAll(' ', '+');
        // eslint-disable-next-line no-await-in-loop
        const songsByCategoryRes = await fetch(
          `/.netlify/functions/get-songs-by-category?category=${categoryURL}`
        );
        // eslint-disable-next-line no-await-in-loop
        const songsArr = await songsByCategoryRes.json();

        allSongsObj[category] = [...songsArr];
        setAllSongsObj({ ...allSongsObj });
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          categories.map((category) => (
            <CategoryCard category={category} songs={allSongsObj[category]} />
          ))
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
