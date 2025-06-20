import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const quizSections = [
  {
    title: "Openness",
    questions: [
      "I enjoy trying new and different activities.",
      "I have a vivid imagination.",
      "I often think about philosophical issues.",
    ],
  },
  {
    title: "Conscientiousness",
    questions: [
      "I like to keep things organized and neat.",
      "I work hard to achieve my goals.",
      "I follow a schedule strictly.",
    ],
  },
  {
    title: "Extraversion",
    questions: [
      "I feel energized when I'm around people.",
      "I like being the center of attention.",
      "I start conversations with strangers easily.",
    ],
  },
  {
    title: "Agreeableness",
    questions: [
      "I am considerate and kind to almost everyone.",
      "I try to avoid conflicts whenever possible.",
      "I am interested in other people’s problems.",
    ],
  },
  {
    title: "Neuroticism",
    questions: [
      "I often feel anxious or worried.",
      "I get easily stressed out.",
      "I tend to overthink things.",
    ],
  },
];

function Quiz() {
  const navi = useNavigate();
  const [responses, setResponses] = useState({});
  const [currentSection, setCurrentSection] = useState(0);
  const [name, setName] = useState("");
  const [mood, setMood] = useState("");

  const handleChange = (question, value) => {
    setResponses({ ...responses, [question]: parseInt(value) });
  };

  const calculateScores = () => {
    const scores = {};
    quizSections.forEach((section) => {
      const total = section.questions.reduce(
        (sum, q) => sum + (responses[q] || 0),
        0
      );
      scores[section.title] = total;
    });
    return scores;
  };

  const handleNext = async (req, res) => {
    if (currentSection < quizSections.length - 1) {
      setCurrentSection(currentSection + 1);
    } else {
      const scores = calculateScores();
      const payload = {
        name,
        mood,
        Openness: scores["Openness"],
        Conscientiousness: scores["Conscientiousness"],
        Extraversion: scores["Extraversion"],
        Agreeableness: scores["Agreeableness"],
        Neuroticism: scores["Neuroticism"],
      };

      try {
        const Responses = await axios.post(
          "http://localhost:8080/api/pps",
          payload,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        alert("Responses submitted successfully!");
        console.log(payload);
        setName("");
        setMood("");
        setResponses({});
        setCurrentSection(0);

        localStorage.setItem("Name", name);
        if (!payload || payload.length === 0) {
          alert("You should attempt at least one question");
        } else {
          navi("/quest");
        }
      } catch (error) {
        if (error.response) {
          console.error("Server responded with error:", error.response.data);
        } else if (error.request) {
          console.error("No response from server. Check server status.");
        } else {
          console.error("Error setting up request:", error.message);
        }

        alert("Failed to submit. Please try again.");
      }
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white  rounded-lg -mt-10">
      {currentSection === 0 && (
        <div>
          <p className="text-3xl m-5 text-red-500 underline shadow-xl  ">
            Quiz to know about u{" "}
          </p>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 mb-6 border border-gray-300 rounded-md text-lg"
          />

          <label
            htmlFor="mood"
            className="block -mt-3 mb-4 text-lg font-medium"
          >
            Select your current mood:
          </label>
          <select
            id="mood"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            className="w-full p-2 mb-5 -mt-2 border border-gray-300 rounded-md text-lg"
          >
            <option value="">-- Choose a Mood --</option>
            <option value="calm">Calm</option>
            <option value="happy">Happy</option>
            <option value="neutral">Neutral</option>
            <option value="anxious">Anxious</option>
            <option value="angry">Angry</option>
          </select>
        </div>
      )}

      <h2 className="text-2xl font-semibold mb-4">
        {quizSections[currentSection].title}
      </h2>

      {quizSections[currentSection].questions.map((question, idx) => (
        <div key={idx} className="mb-5">
          <p className="mb-2 text-gray-700 font-medium">{question}</p>
          <select
            value={responses[question] || ""}
            onChange={(e) => handleChange(question, e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select answer</option>
            <option value="1">Strongly Disagree</option>
            <option value="2">Disagree</option>
            <option value="3">Neutral</option>
            <option value="4">Agree</option>
            <option value="5">Strongly Agree</option>
          </select>
        </div>
      ))}

      <div className="flex justify-between mt-6">
        <button
          onClick={handlePrevious}
          disabled={currentSection === 0}
          className={`px-6 py-2 rounded-md ${
            currentSection === 0
              ? "bg-gray-500 text-gray-600 cursor-not-allowed"
              : "bg-gray-500 text-gray-600 hover:bg-gray-600"
          }`}
        >
          Previous
        </button>

        <button
          onClick={handleNext}
          className="px-6 py-2 bg-blue-600 text-gray-600 rounded-md hover:bg-blue-700"
        >
          {currentSection === quizSections.length - 1 ? "Submit " : "Next"}
        </button>
      </div>
    </div>
  );
}

export default Quiz;
