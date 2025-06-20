import React, { useEffect, useState } from "react";
import axios from "axios";

const Progress = () => {
  const [userData, setUserData] = useState(null);
  const name = localStorage.getItem("Name");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/user/${encodeURIComponent(name)}`
        );
        setUserData(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch user data:", err);
      }
    };
    if (name) {
      fetchData();
    }
  }, [name]);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl  mt-10 relative">
      {userData ? (
        <>
          <p className="absolute -top-30 -right-40 text-lg font-semibold text-yellow-600">
            🏅 Rewards: {userData.rewards}
          </p>

          <h1 className="text-4xl font-extrabold text-center mb-8 text-blue-800">
            {userData.name}'s Progress
          </h1>

          <div className="grid grid-cols-2 gap-4 text-lg text-gray-800">
            <div>🌟 Openness:</div>
            <div>{userData.Openness}</div>

            <div>🗂 Conscientiousness:</div>
            <div>{userData.Conscientiousness}</div>

            <div>🎉 Extraversion:</div>
            <div>{userData.Extraversion}</div>

            <div>🤝 Agreeableness:</div>
            <div>{userData.Agreeableness}</div>

            <div>💭 Neuroticism:</div>
            <div>{userData.Neuroticism}</div>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500 text-lg">
          Loading user data...
        </p>
      )}
    </div>
  );
};

export default Progress;
