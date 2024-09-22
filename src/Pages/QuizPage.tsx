import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { QuizPageProps } from "../Common/types";

interface QuizPageComponentProps {
  questions: QuizPageProps[];
}

const QuizPage: React.FC<QuizPageComponentProps> = ({ questions }) => {
  const { testId } = useParams<{ testId: string }>();
  const [currentQuestions, setCurrentQuestions] = useState<QuizPageProps[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const answersArray = useRef<{ option: string; answer: string }[]>([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isClickable, setIsClickable] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (questions.length > 0 && testId) {
      const filteredQuestions = questions.filter(
        (question) => question.userId === parseInt(testId)
      );
      setCurrentQuestions(filteredQuestions);
    }
  }, [questions, testId]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
        if (timeLeft <= 20) {
          setIsClickable(true);
        }
      } else {
        answersArray.current.push({ option: "X", answer: "No answer" });
        nextQuestion(answersArray.current);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleAnswer = (index: number, choice: string) => {
    if (!isClickable) return;

    const option = String.fromCharCode(65 + index); // A, B, C, D choices from char codes
    answersArray.current.push({ option, answer: choice });
    nextQuestion(answersArray.current);
  };

  const nextQuestion = (
    updatedAnswersArray: { option: string; answer: string }[]
  ) => {
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeLeft(30);
      setIsClickable(false);
    } else {
      console.log("answers", updatedAnswersArray);
      navigate(`/result`, { state: { answers: updatedAnswersArray } });
    }
  };

  return (
    <div className="p-4 flex flex-col items-center justify-around w-full h-full">
      <h1 className="h-1/5 content-center text-2xl font-bold">Test {testId}</h1>
      {currentQuestions.length > 0 &&
        currentQuestionIndex < currentQuestions.length && (
          <div className="h-4/5 flex flex-col justify-between w-full md:w-2/3">
            <h2 className="text-xl mb-4">
              {currentQuestionIndex + 1} -{" "}
              {currentQuestions[currentQuestionIndex].title}
            </h2>
            <div>
              {currentQuestions[currentQuestionIndex].choices.map(
                (choice, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index, choice)}
                    className="block w-full py-2 px-4 mb-2 bg-neutral-800 rounded text-left disabled:bg-neutral-500 disabled:text-neutral-400"
                    disabled={!isClickable}
                  >
                    {String.fromCharCode(65 + index)}. {choice.trim()}
                  </button>
                )
              )}
              <button
                disabled={!isClickable}
                className="block w-full py-2 px-4 mb-2 bg-red-700 rounded text-left disabled:bg-neutral-500 disabled:text-neutral-400"
                onClick={() => {
                  answersArray.current.push({
                    option: "X",
                    answer: "No answer",
                  });
                  nextQuestion(answersArray.current);
                }}
              >
                Skip question
              </button>
            </div>
            <div className="text-right mt-4">Time left: {timeLeft}s</div>
          </div>
        )}
    </div>
  );
};

export default QuizPage;
