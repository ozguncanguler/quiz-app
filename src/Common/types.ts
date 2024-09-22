export interface QuizPageProps {
  id: number;
  title: string;
  choices: string[];
}

export interface AnswerProps {
  option: string;
  answer: string;
}

export interface LocationStateProps {
  answers: AnswerProps[];
}
