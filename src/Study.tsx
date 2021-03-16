import React, { useState, useEffect } from 'react';

import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

import { getVocabs } from './service';

interface IWord {
  word: string;
  idx: number;
}

function Study() {
  const [words, setWords] = useState<IWord[]>([]);
  useEffect(() => setWords(getVocabs()), []);

  return (
    <main>
      <Container>
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>Study</Typography>

        {words && (
            <List component="nav">
              {
                words.map((word: IWord, idx: number) => (
                  <ListItem button component="a" href={'/expression/study/' + word.idx} key={idx}>
                    <ListItemText primary={word.word} key={word.idx} />
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
