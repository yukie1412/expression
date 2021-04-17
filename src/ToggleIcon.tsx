import React, { useState, useEffect } from 'react';

import IconButton from '@material-ui/core/IconButton';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

function ToggleIcon(props: any) {
  const [val, setVal] = useState<boolean>(() => {
    const item = localStorage.getItem(props.word);
    if (!item) {
      return false;
    }

    return JSON.parse(item)[props.iconType];
  });

  useEffect(() => {
    const item = localStorage.getItem(props.word);
    item ? setVal(JSON.parse(item)[props.iconType]) : setVal(false);
  }, [props]);

  const toggle = () => {
    const item = localStorage.getItem(props.word);
    let json: any = {};
    if (item) {
      json = JSON.parse(item);
    }
    json[props.iconType] = !json[props.iconType];
    localStorage.setItem(props.word, JSON.stringify(json));
    setVal(json[props.iconType]);
  }

  const getIcon = () => {
    switch (props.iconType) {
      case 'fav':
        return val ? <StarIcon color="primary" /> : <StarBorderIcon />;
      case 'hide':
        return val ? <VisibilityIcon color="secondary" /> : <VisibilityOffIcon />;
      default:
        return '';
    }
  }

  return (
    <IconButton edge="end" aria-label="favorite" onClick={() => toggle()}>
      {getIcon()}
    </IconButton>
  );
}

export default ToggleIcon;

