export interface QuizPageProps {
  id: number;
  title: string;
  choices: string[];
  userId: number; // userId'yi ekledik
}

export interface AnswerProps {
  option: string;
  answer: string;
}

export interface LocationStateProps {
  answers: AnswerProps[];
}
