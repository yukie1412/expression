export interface Situation {
  preface: string;
  content: string[];
}

export interface VocabObj {
  word: string;
  definition: string[];
  usage: string[];
  isSupplementary: boolean;
  situation?: Situation[];
  synonyms?: string[];
  [key: string]: any;
}

export interface Question {
  question: string;
  answer: string;
}

export interface QuestionSet {
  question: Question;
  options: Question[];
}
