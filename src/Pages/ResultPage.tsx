import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LocationStateProps } from "../Common/types";

const ResultPage: React.FC = () => {
  const location = useLocation();
  const state = location.state as LocationStateProps;
  const navigate = useNavigate();

  const handleRetake = () => {
    navigate("/");
  };

  console.log("answers", state.answers);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Test Results</h1>
      <table className="table-auto w-full mt-4">
        <thead>
          <tr>
            <th className="px-4 py-2">Question No</th>
            <th className="px-4 py-2">Option</th>
            <th className="px-4 py-2">Your Answer</th>
          </tr>
        </thead>
        <tbody>
          {state.answers.map((answer, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{answer.option}</td>
              <td className="border px-4 py-2">{answer.answer}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={handleRetake}
        className="mt-4 bg-neutral-600 text-white py-2 px-4 rounded"
      >
        Retake Test
      </button>
    </div>
  );
};

export default ResultPage;
