// pages/Student/AptitudeTest.jsx
import React, { useState, useEffect } from "react";
import Header from "../../components/common/Header";
import Confetti from "react-confetti";
import { useNavigate } from "react-router-dom";

function AptitudeTest() {
  const navigate = useNavigate();

  // ===== Questions Data =====
  const questions = [
    {
      text: "You enjoy solving logical problems.",
      options: [
        "Strongly Agree",
        "Agree",
        "Neutral",
        "Disagree",
        "Strongly Disagree",
      ],
      section: "Logical",
    },
    {
      text: "You prefer working in a team rather than alone.",
      options: [
        "Strongly Agree",
        "Agree",
        "Neutral",
        "Disagree",
        "Strongly Disagree",
      ],
      section: "Personality",
    },
    {
      text: "You like exploring new creative ideas.",
      options: [
        "Strongly Agree",
        "Agree",
        "Neutral",
        "Disagree",
        "Strongly Disagree",
      ],
      section: "Interest",
    },
    {
      text: "You can stay calm under stressful situations.",
      options: [
        "Strongly Agree",
        "Agree",
        "Neutral",
        "Disagree",
        "Strongly Disagree",
      ],
      section: "Personality",
    },
    {
      text: "You enjoy tasks that require attention to detail.",
      options: [
        "Strongly Agree",
        "Agree",
        "Neutral",
        "Disagree",
        "Strongly Disagree",
      ],
      section: "Logical",
    },
  ];

  const totalQuestions = questions.length;
  const [testStarted, setTestStarted] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(15 * 60);
  const [answers, setAnswers] = useState(Array(totalQuestions).fill(null));

  // ===== Timer Countdown =====
  useEffect(() => {
    let timer;
    if (testStarted && !testCompleted && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    } else if (timeRemaining === 0) {
      setTestCompleted(true);
    }
    return () => clearInterval(timer);
  }, [testStarted, testCompleted, timeRemaining]);

  // ===== Warn user if leaving page mid-test =====
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (testStarted && !testCompleted) {
        e.preventDefault();
        e.returnValue =
          "Your test progress will be lost if you leave this page.";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [testStarted, testCompleted]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleOptionSelect = (option) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = option;
    setAnswers(newAnswers);
  };

  const goNext = () => {
    if (currentQuestion < totalQuestions - 1)
      setCurrentQuestion(currentQuestion + 1);
    else setTestCompleted(true);
  };

  const goPrev = () => {
    if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1);
  };

  const handleViewResults = () => {
    navigate("/student/recommendations");
  };

  const handleRestartTest = () => {
    setTestStarted(false);
    setTestCompleted(false);
    setCurrentQuestion(0);
    setTimeRemaining(15 * 60);
    setAnswers(Array(totalQuestions).fill(null));
  };

  return (
    <div className="flex flex-col min-h-screen font-poppins bg-gradient-to-b from-gray-950 via-gray-900 to-gray-900 text-gray-100">
      <Header title="Aptitude & Personality Test" />

      <main className="flex-1 p-6 mt-20 flex flex-col items-center relative">
        {/* 🎉 Confetti on Completion */}
        {testCompleted && (
          <Confetti width={window.innerWidth} height={window.innerHeight} />
        )}

        {/* ===== START SCREEN ===== */}
        {!testStarted && !testCompleted && (
          <div className="w-full max-w-3xl bg-gradient-to-br from-gray-800 via-blue-900/40 to-gray-900 border border-blue-500/20 p-10 mt-20 rounded-2xl shadow-lg hover:shadow-blue-400/20 transition-transform hover:-translate-y-1 text-center">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-yellow-400 to-orange-400 bg-clip-text text-transparent mb-2">
              Aptitude & Personality Assessment
            </h2>
            <p className="text-gray-300">
              You have{" "}
              <span className="font-semibold text-blue-400">
                {totalQuestions}
              </span>{" "}
              questions to complete in{" "}
              <span className="font-semibold text-yellow-400">15 minutes</span>.
            </p>
            <p className="text-gray-400 text-sm mt-2">
              This test evaluates your logical, personality, and interest
              traits. Please ensure a quiet environment before you begin.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center">
              <button
                onClick={() => setTestStarted(true)}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-lg font-semibold shadow-md hover:shadow-blue-400/40 hover:scale-[1.03] transition"
              >
                Start Test
              </button>
              <button
                onClick={handleRestartTest}
                className="px-8 py-3 bg-gray-800 text-gray-200 rounded-lg hover:bg-gray-700 hover:scale-[1.03] transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* ===== TEST QUESTIONS ===== */}
        {testStarted && !testCompleted && (
          <>
            {/* ===== Info Bar ===== */}
            <div className="w-full max-w-4xl mb-6 flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-gray-800 via-gray-900/90 to-gray-800 border border-blue-500/20 p-4 rounded-2xl shadow-md">
              <div className="flex flex-col">
                <span className="text-gray-400 text-sm">
                  Question {currentQuestion + 1} of {totalQuestions}
                </span>
                <div className="w-64 bg-gray-700 h-2 rounded-full mt-1 overflow-hidden">
                  <div
                    className="h-2 bg-gradient-to-r from-blue-500 via-yellow-400 to-orange-500 transition-all duration-500"
                    style={{
                      width: `${
                        ((currentQuestion + 1) / totalQuestions) * 100
                      }%`,
                    }}
                  />
                </div>
              </div>
              <div className="text-gray-400 font-mono text-sm flex items-center gap-1">
                ⏱{" "}
                <span className="text-blue-400 font-semibold">
                  {formatTime(timeRemaining)}
                </span>{" "}
                remaining
              </div>
            </div>

            {/* ===== Question Card ===== */}
            <div className="w-full max-w-4xl bg-gradient-to-br from-gray-800 via-blue-900/40 to-gray-900 border border-blue-500/20 p-8 rounded-2xl shadow-md hover:shadow-blue-400/20 transition-all duration-300 transform hover:-translate-y-1">
              <h2 className="text-xl font-semibold text-blue-400">
                {questions[currentQuestion].section} Section
              </h2>
              <p className="text-gray-100 text-lg mt-2">
                {questions[currentQuestion].text}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                {questions[currentQuestion].options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleOptionSelect(opt)}
                    className={`px-4 py-2 rounded-lg border transition-all duration-300 ${
                      answers[currentQuestion] === opt
                        ? "bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/40 border-blue-400"
                        : "border-gray-700 hover:bg-gray-800 hover:border-blue-400/30"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row justify-between mt-6 gap-4 sm:gap-0">
                <button
                  onClick={goPrev}
                  className="px-5 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-200 transition-all w-full sm:w-auto"
                  disabled={currentQuestion === 0}
                >
                  Previous
                </button>
                <button
                  onClick={goNext}
                  className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold shadow-md hover:shadow-blue-400/40 hover:scale-[1.03] transition w-full sm:w-auto"
                >
                  {currentQuestion === totalQuestions - 1
                    ? "Finish Test"
                    : "Next"}
                </button>
              </div>
            </div>

            {/* ===== Section Info ===== */}
            <div className="w-full max-w-4xl mt-6 flex justify-end">
              <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 border border-blue-500/20 p-4 rounded-2xl shadow-sm w-52 text-sm text-gray-300">
                <p className="font-medium mb-2">
                  Section:{" "}
                  <span className="text-blue-400">
                    {questions[currentQuestion].section}
                  </span>
                </p>
                <p className="text-gray-400">
                  Remaining: {totalQuestions - (currentQuestion + 1)}
                </p>
              </div>
            </div>
          </>
        )}

        {/* ===== COMPLETION SCREEN ===== */}
        {testCompleted && (
          <div className="w-full max-w-3xl bg-gradient-to-br from-gray-800 via-blue-900/40 to-gray-900 border border-green-500/20 p-10 mt-16 rounded-2xl shadow-lg hover:shadow-green-400/30 flex flex-col items-center gap-6 text-center transition-transform hover:-translate-y-1">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-yellow-400 to-blue-400">
              🎉 Test Completed!
            </h2>
            <p className="text-gray-300">
              Great work! You’ve successfully completed your Aptitude &
              Personality Test.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <button
                onClick={handleViewResults}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 text-white rounded-lg font-semibold shadow-md hover:shadow-blue-400/40 hover:scale-[1.03] transition w-full sm:w-auto"
              >
                View Results & Recommendations
              </button>
              <button
                onClick={handleRestartTest}
                className="px-8 py-3 bg-gray-800 text-gray-200 rounded-lg hover:bg-gray-700 hover:scale-[1.03] transition w-full sm:w-auto"
              >
                Retake Test
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default AptitudeTest;
