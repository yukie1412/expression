import { VocabObj, Question, QuestionSet } from './interfaces/vocabObj';
import JSONResult from './idioms.json';

const getJson = () => {
  return JSONResult;
}

const getRandomIdx = (total: number): number => {
  return Math.floor(Math.random() * total);
}

const getRandomQuestion = (idx: number): Question => {
  const data = getJson();
  const word: VocabObj = data[idx];
  const keys = Object.keys(word).filter((key: string) => key !== 'word' && key !== 'situation');
  const key = keys[getRandomIdx(keys.length)];
  const question = word[key][getRandomIdx(word[key].length)];
  return {
    question,
    answer: word.word
  };
}

export const getTotal = (): number => {
  const data = getJson();
  return data.length;
}

export const getVocabs = () => {
  const data = getJson();
  return data.map((vocab: VocabObj, idx: number) => {
    return {
      idx,
      word: vocab.word
    };
  });
}

export const getVocabDetail = (idx: string): VocabObj => {
  const data = getJson();
  const index = parseInt(idx, 10);
  if (isNaN(index) || index >= data.length) {
    window.history.replaceState(null, data[0].word, '/expression/study/0');
    return data[0];
  }
  if (index < 0) {
    const last = data.length - 1;
    window.history.replaceState(null, data[last].word, `/expression/study/${last}`);
    return data[last];
  }
  return data[index];
}

export const getQuestionSet = (): QuestionSet => {
  const total = getTotal();
  const idx = getRandomIdx(total);
  const question = getRandomQuestion(idx);

  const data = getJson(); // TODO: limit to 5
  const options = data
    .map((vocab: VocabObj, i: number) => i === idx ? question : getRandomQuestion(i));

  return {
    question,
    options
  };
}
