import PsyModel from "../models/Pyshchology.js";

export const Questmaking = async (req, res) => {
  try {
    const user = await PsyModel.findOne({ name: req.params.name });
    if (!user) return res.status(404).json({ message: "User not found" });

    const {
      name,
      mood,
      Openness,
      Conscientiousness,
      Extraversion,
      Agreeableness,
      Neuroticism,
    } = user;

    let quest = {
      title: "Simple Joy",
      context: `${name} is feeling ${mood} today. Let’s keep things light and fun.`,
      instructions: "Watch a funny short video or meme that makes you smile.",
    };

    if (Openness > 10) {
      quest = {
        title: "Creative Spark",
        context: `${name} is in a ${mood} mood, and their high Openness suggests a love for new ideas.`,
        instructions: "Try doodling or journaling something imaginative today.",
      };
    } else if (Extraversion > 10) {
      quest = {
        title: "Social Boost",
        context: `${name} seems energized today. Extraverted minds thrive on connection.`,
        instructions: "Send a voice note or call a friend to share good vibes.",
      };
    } else if (Neuroticism > 10) {
      quest = {
        title: "Emotional Balance",
        context: `Even though ${name} feels ${mood}, higher Neuroticism means emotional awareness is key.`,
        instructions:
          "Take 5 minutes for slow breathing or a short walk to decompress.",
      };
    } else if (Conscientiousness > 10) {
      quest = {
        title: "Organized Mind",
        context: `${name}'s conscientious side is sharp — use it today!`,
        instructions:
          "Create a 3-item to-do list and complete just one thing from it.",
      };
    } else if (Agreeableness > 10) {
      quest = {
        title: "Kindness Loop",
        context: `${name}'s high Agreeableness shows a caring nature.`,
        instructions:
          "Do a small act of kindness today—send someone a compliment or a thank-you.",
      };
    }

    res.status(200).json({ quest });
  } catch (error) {
    console.error("❌ Error generating quest:", error.message || error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
