import express from "express";
import { Questmaking } from "../controllers/gptapi.js";
import { PPS } from "../controllers/authcheck.js";
import uploadRoute from "../controllers/response.js";
import { fetch } from "../controllers/fetch.js";

const route = express.Router();

route.post("/pps", PPS);
route.get("/quest/byname/:name", Questmaking);
route.use("/upload", uploadRoute);
route.get("/user/:name", fetch);
export default route;
