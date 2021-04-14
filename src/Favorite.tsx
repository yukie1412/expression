import React, { useState, useEffect } from 'react';

import IconButton from '@material-ui/core/IconButton';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';

function Favorite(props: any) {
  const [isFav, setFav] = useState<boolean>(() => {
    const item = localStorage.getItem(props.word);
    if (!item) {
      return false;
    }
    return JSON.parse(item).isFav;
  });

  useEffect(() => {
    const item = localStorage.getItem(props.word);
    item ? setFav(JSON.parse(item).isFav) : setFav(false);
  }, [props]);

  const toggleFav = () => {
    const item = localStorage.getItem(props.word);
    let json: any = {};
    if (item) {
      json = JSON.parse(item);
    }
    json.isFav = !json.isFav;
    localStorage.setItem(props.word, JSON.stringify(json));
    setFav(json.isFav);
  }

  return (
    <IconButton edge="end" aria-label="favorite" onClick={() => toggleFav()}>
      { isFav ? <StarIcon color="primary" /> : <StarBorderIcon /> }
    </IconButton>
  );
}

export default Favorite;

