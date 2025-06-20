import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const goToQuiz = () => {
    navigate("/quiz");
  };

  return (
    <div>
      <p className="absolute top-10 right-20 text-xl">Rewards 🏅</p>
      <h1 className="font-bold text-black">Welcome to Solo Spark</h1>
      <br />

      <p className="text-xl ">
        Discover your personality, track your emotional growth, and complete
        daily quests designed just for you.
      </p>
      <button
        className=" h-10 w-60 m-10 !bg-gray-300 hover:text-xl"
        onClick={goToQuiz}
      >
        Start Your Personality Quiz
      </button>
    </div>
  );
}

export default Home;
