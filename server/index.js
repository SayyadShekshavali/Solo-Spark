import route from "./routers/routes.js";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectMDB from "./MDBconfig.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use("/api", route);

connectMDB();

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
