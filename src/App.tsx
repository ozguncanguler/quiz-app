import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import TestSelection from "./Pages/TestSelection";
import QuizPage from "./Pages/QuizPage";
import ResultPage from "./Pages/ResultPage";
import { QuizPageProps } from "./Common/types";

const App: React.FC = () => {
  const [questions, setQuestions] = useState<QuizPageProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        const data = await response.json();
        const parsedQuestions = data.map((item: any) => ({
          id: item.id,
          title: item.title,
          choices: item.body.split("\n"),
          userId: item.userId,
        }));
        setQuestions(parsedQuestions);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch questions", error);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<TestSelection questions={questions} loading={loading} />}
        />
        <Route
          path="/quiz/:testId"
          element={<QuizPage questions={questions} />}
        />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </Router>
  );
};

export default App;
