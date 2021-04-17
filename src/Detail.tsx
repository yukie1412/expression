import React, { useState, useEffect } from 'react';
import { useParams, useHistory, useLocation } from 'react-router';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Container from '@material-ui/core/Container';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

import ToggleIcon from './ToggleIcon';
import { getVocabDetail, getTotal } from './service';
import { VocabObj, VocabBase } from './interfaces/vocabObj';

interface IDetailParam {
  id: string;
}

function Detail() {
  const history = useHistory();
  const location = useLocation();
  const { id } = useParams<IDetailParam>();
  const [vocab, setVocab] = useState<VocabObj>();
  const total = getTotal();

  useEffect(() => {
    let vocab = getVocabDetail(id);
    setVocab(vocab);
  
    const item = localStorage.getItem(vocab.word);
    let json: any = {};
    if (item) {
      json = JSON.parse(item);
    }
    json.lastViewed = Date.now();
    localStorage.setItem(vocab.word, JSON.stringify(json));
  }, [location, id]);

  const toPage = (page: 'next' | 'last') => {
    let cur = parseInt(id, 10);
    if (isNaN(cur)) {
      cur = 0;
    }
    cur = page === 'next' ? cur + 1 : cur - 1;
    if (cur < 0) {
      cur = total - 1;
    } else if (cur >= total) {
      cur = 0;
    }
    history.push(`/expression/study/${cur}`);
  }

  const toLast = () => {
    toPage('last');
  }

  const toNext = () => {
    toPage('next');
  }

  const styledListItem = (text: string, word: string) => {
    const arr = text.split('_____');
    if (arr.length === 1) {
      return <div>{text}</div>
    }
    return <div>{arr[0]}<strong>{word}</strong>{arr[1]}</div>
  };

  const listContent = (arr: string[], word: string) => (
    <List aria-label="Content">
      {
        arr.map((text: string, idx: number) => (
          <ListItem key={idx}>
            <ListItemText>
              {styledListItem(text, word)}
            </ListItemText>
          </ListItem>
        ))
      }
    </List>
  )

  const accordion = (key: string, isObj: boolean = false) => {
    if (!vocab || !vocab.hasOwnProperty(key)) { return ''; }
    return (
      <Accordion key={key}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={key}>
          <Typography variant="h6">{key}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {!isObj && listContent(vocab[key], vocab.word)}
          {isObj && (<List aria-label={key}>
            {vocab[key].map((obj: VocabBase, idx: number) => (
              <div key={idx}>
                <Typography variant="subtitle1">{obj.word}</Typography>
                <ListItem>
                  { listContent(obj.usage, obj.word) }
                </ListItem>
              </div>
            ))}
          </List>)}
        </AccordionDetails>
      </Accordion>
    );
  };

  const content = () => {
    if (!vocab) {
      return '';
    }
    return (
      <Container>
        <Grid container direction="row" justify="space-between" alignItems="baseline">
          <IconButton color="primary" aria-label="last vocab" component="span" onClick={toLast}>
            <ChevronLeftIcon />
          </IconButton>
          <Hidden mdDown>
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              {vocab.word}
            </Typography>
          </Hidden>
          <ToggleIcon word={vocab.word} iconType="fav" />
          <IconButton color="primary" aria-label="next vocab" component="span" onClick={toNext}>
            <ChevronRightIcon />
          </IconButton>
        </Grid>
        <Hidden mdUp>
          <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
            {vocab.word}
          </Typography>
        </Hidden>

        {accordion('definition')}
        {accordion('usage')}
        {accordion('synonyms')}
        {accordion('situation', true)}
        {accordion('extension', true)}
      </Container>
    );
  }

  return <main>{content()}</main>;
}

export default Detail;
