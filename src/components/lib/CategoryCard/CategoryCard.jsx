/* eslint-disable no-unused-vars */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import SongsList from '../SongsList/SongsList';
import './CategoryCard.css';

export default function CategoryCard({ category, songs }) {
  const [expanded, setExpanded] = React.useState(true);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card id="categoryCard">
      <CardHeader
        id="cardHeader"
        action={
          <button type="button" onClick={handleExpandClick}>
            {expanded ? 'hide' : 'show'}
          </button>
        }
        title={category}
      />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <SongsList songs={songs} />
        </CardContent>
      </Collapse>
    </Card>
  );
}
