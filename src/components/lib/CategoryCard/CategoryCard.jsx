import React, { useState } from 'react';
import { styled } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SongsList from '../SongsList/SongsList';
import EditSongModal from '../../Modal/EditSongModal';
import './CategoryCard.css';

export default function CategoryCard({
  allCategories,
  currentCategory,
  songs,
  index,
  update,
}) {
  const [currentSong, setCurrentSong] = useState(undefined);
  const [expanded, setExpanded] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginRight: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleModalOpen = (value) => {
    setCurrentSong(value);
    setModalIsOpen(true);
  };

  const handleModalClose = () => {
    setModalIsOpen(false);
  };

  return (
    <Card className="categoryCard" style={{ order: expanded ? 0 : -1 }}>
      {/* Modal lives here in navbar */}
      <EditSongModal
        allCategories={allCategories}
        currentCategory={currentCategory}
        currentSong={currentSong}
        open={modalIsOpen}
        handleModalClose={handleModalClose}
        update={update}
      />
      {/* End modal */}
      <CardHeader
        className="cardHeader"
        action={
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        }
        title={currentCategory}
      />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <SongsList songs={songs} handleModalOpen={handleModalOpen} />
        </CardContent>
      </Collapse>
    </Card>
  );
}
