import express from "express";
import multer from "multer";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post(
  "/",
  upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "audio", maxCount: 1 },
  ]),
  (req, res) => {
    const { text } = req.body;
    const photo = req.files["photo"]?.[0];
    const audio = req.files["audio"]?.[0];

    console.log("Text:", text);
    console.log("Photo file:", photo);
    console.log("Audio file:", audio);

    res.json({ message: "Files received!" });
  }
);

export default router;
