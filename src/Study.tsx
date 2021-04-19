import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';

import ToggleIcon from './ToggleIcon';
import { getVocabs } from './service';

enum filterTypes {
  all = 'all',
  starred = 'starred',
  viewed = 'viewed',
  unread = 'unread'
}

interface IWord {
  word: string;
  idx: number;
}

interface FilterOption {
  key: filterTypes;
  value: string;
}

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  }
}));

const studyFilter: FilterOption[] = [
  {
    key: filterTypes.all,
    value: 'All'
  },
  {
    key: filterTypes.starred,
    value: 'Starred'
  },
  {
    key: filterTypes.viewed,
    value: 'Viewed'
  },
  {
    key: filterTypes.unread,
    value: 'Unread'
  }
];

function Study() {
  const classes = useStyles();
  const [words, setWords] = useState<IWord[]>([]);
  const [hideState, setHideState] = useState<boolean>(true); // hide by default
  const [hiddenWords, setHiddenWords] = useState<{[key: string]: boolean}>({});
  const [stateFilter, setStateFilter] = useState<string>(filterTypes.all);

  useEffect(() => {
    const words = getVocabs();
    setWords(words);
    const tmp: {[key: string]: boolean} = {};
    for (const word of words) {
      const item = localStorage.getItem(word.word);
      tmp[word.word] = item && JSON.parse(item).hide ? true : false;
    }
    setHiddenWords(tmp);
  }, [stateFilter]);

  const updateFilter = (e: any) => {
    setStateFilter(e.target.value);
  }

  const isStarred = (word: string) => {
    const item = localStorage.getItem(word);
    if (!item) {
      return false;
    }
    return JSON.parse(item).fav;
  }

  const isViewed = (word: string) => {
    return !!localStorage.getItem(word);
  }

  const generateFilter = (label: string, options: FilterOption[]) => {
    const id = 'filter-' + label;
    return (
      <FormControl className={classes.formControl}>
        <InputLabel id={id}>{label}</InputLabel>
        <Select labelId={id} value={stateFilter} onChange={updateFilter}>
          {
            options.map((option: FilterOption) => (
              <MenuItem value={option.key}>{option.value}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
    );
  }

  const toggleWordState = (word: string) => {
    hiddenWords[word] = !hiddenWords[word];
    setHiddenWords(hiddenWords);
  }

  const toggleHideState = () => {
    setHideState(!hideState);
  }

  const Filters = () => (
    <Grid container spacing={3} alignItems="flex-end">
      { generateFilter('State', studyFilter) }
      <FormControlLabel control={<Checkbox name="hide" checked={hideState} />}
        label={hideState ? 'Show' : 'Hide'} onClick={toggleHideState}/>
    </Grid>
  );

  return (
    <main>
      <Container>
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>Study</Typography>
        <Filters />

        {words && (
            <List component="nav">
              {
                words.filter((word: IWord) => {
                  switch (stateFilter) {
                    case filterTypes.starred:
                      return isStarred(word.word);
                    case filterTypes.viewed:
                      return isViewed(word.word);
                    case filterTypes.unread:
                      return !isViewed(word.word);
                    default:
                      return true;
                  }
                }).filter((word: IWord) => hideState ? true : !hiddenWords[word.word]
                ).map((word: IWord, idx: number) => (
                  <ListItem button component="a" href={'/expression/study/' + word.idx} key={idx}>
                    <ListItemText primary={word.word} key={word.idx} />
                    <ListItemSecondaryAction>
                      <ToggleIcon word={word.word} iconType="fav" />
                      <ToggleIcon word={word.word} iconType="hide" onClick={() => toggleWordState(word.word)}/>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))
              }
            </List>
          )
        }
      </Container>
    </main>
  );
}

export default Study;
