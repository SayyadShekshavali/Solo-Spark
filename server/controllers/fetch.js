import PsyModel from "../models/Pyshchology.js";

export const fetch = async (req, res) => {
  try {
    const { name } = req.params;

    const user = await PsyModel.findOne({ name });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error("❌ Error fetching user:", err);
    res.status(500).json({ message: "Server error" });
  }
};
