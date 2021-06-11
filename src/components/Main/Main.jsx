import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../stores/authContext';
import CategoryCard from '../lib/CategoryCard/CategoryCard';
import './Main.css';

export default function Main() {
  const { user, login } = useContext(AuthContext);
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
            <li>test 1</li>
            <li>test 2</li>
            <li>test 3</li>
            <li>test 4</li>
            <li>test 5</li>
            <li>test 6</li>
            <li>test 7</li>
            <li>test 8</li>
            <li>test 9</li>
            <li>test 10</li>
            <li>test 11</li>
            <li>test 12</li>
            <li>test 13</li>
            <li>test 14</li>
            <li>test 15</li>
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
