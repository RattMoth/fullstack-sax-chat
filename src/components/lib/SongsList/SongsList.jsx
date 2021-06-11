import React, { useContext, useEffect } from 'react';
import './SongsList.css';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
} from '@material-ui/core';
import SetlistContext from '../../../stores/setlistContext';

export default function SongsList(props) {
  const { setlistSongs, setSetlistSongs } = useContext(SetlistContext);

  const { category } = props;

  const handleToggle = (value) => () => {
    const currentIndex = setlistSongs.indexOf(value);
    const newChecked = [...setlistSongs];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setSetlistSongs(newChecked);
  };

  const arr =
    category === 'Video Games'
      ? [
          'Animal Crossing',

          'Animal Crossing Medley',

          'Animal Crossing - 5 PM',

          'Animal Crossing - 7 AM',

          'Animal Crossing - Lucky K.K.',

          'Animal Crossing: City Folk - Nook N’ Go',

          'Animal Crossing: New Horizons - Main Theme',

          'Animal Crossing: New Horizons - 10AM-12PM',

          'Banjo Kazooie - Gruntilda’s Lair',

          'Banjo Kazooie - Title Theme',

          'Castlevania 2 - Bloody Tears',

          'Civilization - Baba Yetu',

          'Chrono Cross - Time’s Scar',

          'Chrono Trigger - Millenial Fair',

          'Chrono Trigger - Wind Scene (600 A.D.)',

          'Deltarune - Scarlet Fever',

          'Donkey Kong 64 - Jungle Japes',

          'Donkey Kong Country - Donkey Kong’s Big Day',

          'Donkey Kong Country GBC - Voice of the Temple',

          'Donkey Kong Country 2 Medley',

          'Dragon Quest Overture',

          'Dragon Quest Royalty Suite',

          'Dragon Quest III - Adventure',

          'Earthbound - Fourside',

          'F-Zero - Big Blue',
        ]
      : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <List id="list">
      {arr.map((value) => {
        const labelId = `checkbox-list-label-${value}`;

        return (
          <ListItem
            key={value}
            role={undefined}
            dense
            button
            onClick={handleToggle(value)}
          >
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={setlistSongs.indexOf(value) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemIcon>
            <ListItemText id={labelId} primary={value} />
          </ListItem>
        );
      })}
    </List>
  );
}
