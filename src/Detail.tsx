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
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

import { getVocabDetail, getTotal } from './service';
import { VocabObj, Situation } from './interfaces/vocabObj';

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
    setVocab(getVocabDetail(id));
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
    history.push(`/study/${cur}`);
  }

  const toLast = () => {
    toPage('last');
  }

  const toNext = () => {
    toPage('next');
  }

  const styledListItem = (text: string) => {
    if (!vocab) { return ''; }
    const arr = text.split('_____');
    if (arr.length === 1) {
      return <div>{text}</div>
    }
    return <div>{arr[0]} <strong>{vocab.word}</strong> {arr[1]}</div>
  };

  const listContent = (arr: string[]) => (
    <List aria-label="Content">
      {
        arr.map((text: string, idx: number) => (
          <ListItem key={idx}>
            <ListItemText>
              {styledListItem(text)}
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
          {!isObj && listContent(vocab[key])}
          {isObj && (<List aria-label="Situation">
            {vocab[key].map((obj: Situation, idx: number) => (
              <div>
                <Typography variant="subtitle1">{obj.preface}</Typography>
                <ListItem key={idx}>
                  { listContent(obj.content) }
                </ListItem>
              </div>
            ))}
          </List>)}
        </AccordionDetails>
      </Accordion>
    );
  };

  const content = () => {
    if (vocab) {
      return (
        <Container>
          <Grid container direction="row" justify="space-between" alignItems="baseline">
            <IconButton color="primary" aria-label="last vocab" component="span" onClick={toLast}>
              <ChevronLeftIcon />
            </IconButton>
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              {vocab.word}
            </Typography>
            <IconButton color="primary" aria-label="next vocab" component="span" onClick={toNext}>
              <ChevronRightIcon />
            </IconButton>
          </Grid>

          {accordion('definition')}
          {accordion('usage')}
          {accordion('synonyms')}
          {accordion('situation', true)}
        </Container>
      );
    }
    return '';
  }

  return <main>{content()}</main>;
}

export default Detail;
