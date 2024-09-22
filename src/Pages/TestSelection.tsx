import React from "react";
import { useNavigate } from "react-router-dom";

const TestSelection: React.FC = () => {
  const navigate = useNavigate();

  const handleTestSelect = (testId: number) => {
    navigate(`/quiz/${testId}`);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Select a Test</h1>
      <div className="mt-4">
        {[...Array(10)].map((_, index) => (
          <button
            key={index}
            onClick={() => handleTestSelect(index + 1)}
            className="block w-full py-2 px-4 mb-2 bg-neutral-800 rounded"
          >
            Test {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TestSelection;
