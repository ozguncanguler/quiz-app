import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { QuizPageProps } from "../Common/types";

const QuizPage: React.FC = () => {
  const { testId } = useParams<{ testId: string }>();
  const [questions, setQuestions] = useState<QuizPageProps[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const answersArray = useRef<{ option: string; answer: string }[]>([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isClickable, setIsClickable] = useState(false);
  const navigate = useNavigate();

  // Get question data on the first render
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        const data = await response.json();
        const parsedQuestions = data.slice(0, 10).map((item: any) => ({
          id: item.id,
          title: item.title,
          choices: item.body.split("\n"),
        }));
        setQuestions(parsedQuestions);
      } catch (error) {
        console.error("Failed to fetch questions", error);
      }
    };
    fetchQuestions();
  }, []);

  // Time controls
  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
        if (timeLeft <= 20) {
          setIsClickable(true);
        }
      } else {
        // Save no answer after 30 second timeout
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
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeLeft(30);
      setIsClickable(false);
    } else {
      console.log("answers", updatedAnswersArray);
      navigate(`/result`, { state: { answers: updatedAnswersArray } }); // Navigate and save result
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Test {testId} </h1>
      {questions.length > 0 && currentQuestionIndex < questions.length && (
        <div>
          <h2 className="text-xl mb-4">
            {currentQuestionIndex + 1} - {questions[currentQuestionIndex].title}
          </h2>
          <div>
            {questions[currentQuestionIndex].choices.map((choice, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index, choice)}
                className="block w-full py-2 px-4 mb-2 bg-neutral-800 rounded text-left disabled:bg-neutral-500 disabled:text-neutral-400"
                disabled={!isClickable}
              >
                {String.fromCharCode(65 + index)}. {choice.trim()}
              </button>
            ))}
          </div>
          <div className="text-right mt-4">Time left: {timeLeft}s</div>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
