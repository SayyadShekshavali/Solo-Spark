import mongoose from "mongoose";

const PersonalitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    mood: {
      type: String,
      required: true,
    },
    Openness: {
      type: Number,
      required: true,
    },
    Conscientiousness: {
      type: Number,
      required: true,
    },
    Extraversion: {
      type: Number,
      required: true,
    },
    Agreeableness: {
      type: Number,
      required: true,
    },
    Neuroticism: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const PsyModel = mongoose.model("PersonalityProfile", PersonalitySchema);

export default PsyModel;
