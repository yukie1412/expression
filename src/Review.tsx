import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

import { QuestionSet, Question } from './interfaces/vocabObj';
import { getQuestionSet } from './service';

function Review() {
  const [question, setQuestion] = useState<QuestionSet>(getQuestionSet());
  const [selection, setSelection] = useState<number>(-1);
  const [solution, setSolution] = useState<boolean>(false);

  const getNext = () => {
    setQuestion(getQuestionSet());
    setSelection(-1);
    setSolution(false);
  }

  const toggleSolution = (idx: number) => {
    setSelection(selection === idx ? -1 : idx);
  }

  const getIcon = (idx: number) => {
    if (solution) {
      if (question.options[idx]
        && question.options[idx].answer === question.question.answer) {
        return <CheckCircleOutlineIcon />
      }
      return <HighlightOffIcon />
    }

    if (idx !== selection) {
      return <RadioButtonUncheckedIcon />;
    }
    if (idx === selection && question.options[idx]
      && question.options[idx].answer === question.question.answer) {
      return <CheckCircleOutlineIcon />
    }
    return <HighlightOffIcon />
  }

  const renderCardContent = () => {
    if (!question) { return ''; }

    return (
      <CardContent>
        <Typography variant="h5" component="h2">{question.question.question}</Typography>

        <List aria-label="Options">
          {
            question.options.map((option: Question, idx: number) => (
              <ListItem key={idx} button onClick={() => !solution && toggleSolution(idx)}>
                <ListItemIcon>{getIcon(idx)}</ListItemIcon>
                <ListItemText primary={option.answer} />
              </ListItem>
            ))
          }
        </List>
      </CardContent>
    )
  }

  return (
    <main>
      <Container>
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>Review</Typography>

        <Card variant="outlined">
          {renderCardContent()}
          <CardActions>
            <Button variant="contained" color="primary" onClick={getNext}>Next</Button>
            <Button variant="contained" onClick={() => setSolution(true)}
              disabled={solution}>Solution</Button>
          </CardActions>
        </Card>
      </Container>
    </main>
  );
}

export default Review;
