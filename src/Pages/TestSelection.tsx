import React from "react";
import { useNavigate } from "react-router-dom";
import { QuizPageProps } from "../Common/types";

interface TestSelectionProps {
  questions: QuizPageProps[];
  loading: boolean;
}

const TestSelection: React.FC<TestSelectionProps> = ({
  questions,
  loading,
}) => {
  const navigate = useNavigate();

  const handleTestSelect = (userId: number) => {
    navigate(`/quiz/${userId}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const uniqueTests = Array.from(new Set(questions.map((q) => q.userId)));

  return (
    <div className="p-4 flex flex-col items-center justify-center w-full h-full">
      <h1 className="text-2xl font-bold">Select a Test</h1>
      <div className="mt-4 w-1/2 md:w-1/6">
        {uniqueTests.map((userId, index) => (
          <button
            key={index}
            onClick={() => handleTestSelect(userId)}
            className="block w-full py-2 px-4 mb-2 bg-neutral-800 rounded"
          >
            Test {userId}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TestSelection;
