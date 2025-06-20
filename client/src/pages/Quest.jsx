import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const QuestDisplay = () => {
  const navigate = useNavigate();
  const [quest, setQuest] = useState(null);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    const storedId = localStorage.getItem("Name");
    if (storedId) setName(storedId);
  }, []);

  const fetchQuest = async () => {
    if (!name) return;

    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:8080/api/quest/byname/${encodeURIComponent(name)}`
      );

      const quest = res.data.quest;
      console.log("Quest received:", quest);

      setQuest({
        title: quest.title,
        context: quest.context,
        instructions: quest.instructions,
      });
    } catch (err) {
      console.error("❌ Failed to fetch quest", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    try {
      const res = await fetch("http://localhost:8080/api/upload", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        const text = await res.text();
        console.error("Upload failed", res.status, text);
        return;
      }
      const result = await res.json();
      console.log("✅ Success:", result);
      alert("✅ Success:", result);
      navigate("/");
    } catch (err) {
      console.error("❌ Upload failed:", err);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-2xl  mt-10">
      <h2 className="text-2xl font-bold text-center mb-4">🎯 Daily Quest</h2>

      <button
        onClick={fetchQuest}
        disabled={!name || loading}
        className="w-full bg-blue-600 text-black p-2 rounded hover:bg-blue-700"
      >
        {loading ? "Loading..." : "Generate Quest"}
      </button>

      {quest && (
        <div className="mt-6 bg-gray-50 p-4 rounded">
          <h3 className="text-xl font-semibold mb-2">📝 {quest.title}</h3>
          <p className="text-gray-800 mb-2">
            <strong>Context:</strong> {quest.context}
          </p>
          <p className="text-gray-800">
            <strong>Instructions:</strong> {quest.instructions}
          </p>
        </div>
      )}

      <h2 className="text-red-500 text-2xl py-5 underline">
        Respond and take rewards
      </h2>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label className="flex">Text:</label>
        <br />
        <textarea
          className="-mt-5 border-2 border-black rounded-xl"
          name="text"
          rows="4"
          cols="50"
        ></textarea>
        <br />
        <br />

        <label className="flex">Upload Photo:</label>
        <br />
        <input
          className="border-2 border-black rounded-xl p-3"
          type="file"
          name="photo"
          accept="image/*"
        />
        <br />
        <br />

        <label className="flex">Record Audio:</label>
        <br />
        <button className="-mt-20" type="button" id="recordBtn">
          🎙 Start Recording
        </button>
        <p id="recordingStatus"></p>
        <br />
        <input
          type="file"
          name="audio"
          accept="audio/*"
          id="audioInput"
          hidden
        />
        <br />
        <br />

        <button className="!-mt-60" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default QuestDisplay;
