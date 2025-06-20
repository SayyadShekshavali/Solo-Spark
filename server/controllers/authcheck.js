import PsyModel from "../models/Pyshchology.js";
export const PPS = async (req, res) => {
  try {
    console.log("Received payload:", req.body);
    const {
      name,
      mood,
      Openness,
      Conscientiousness,
      Extraversion,
      Agreeableness,
      Neuroticism,
    } = req.body;

    const isname = await PsyModel.findOne({ name });
    if (isname) {
      return res.status(409).json({
        message: "User Psychological profile  already stored",
      });
    }
    const newProfile = new PsyModel({
      name,
      mood,
      Openness,
      Conscientiousness,
      Extraversion,
      Agreeableness,
      Neuroticism,
    });

    await newProfile.save();

    res.status(201).json({
      message: "Personality profile saved successfully",
      data: newProfile,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
