import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TestSelection from "./Pages/TestSelection";
import QuizPage from "./Pages/QuizPage";
import ResultPage from "./Pages/ResultPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TestSelection />} />
        <Route path="/quiz/:testId" element={<QuizPage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </Router>
  );
};

export default App;
