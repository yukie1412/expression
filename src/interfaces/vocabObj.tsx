export interface VocabBase {
  word: string;
  usage: string[];
}

export interface VocabObj extends VocabBase {
  definition: string[];
  situation?: VocabBase[];
  extension?: VocabBase[];
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
