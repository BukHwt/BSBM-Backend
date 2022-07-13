import * as functions from "firebase-functions";
import express from "express";
import cors from "cors";
import meadRouter from "./routes/meadRouter";
const app = express();
app.use(cors());
app.use(express.json());
app.use("/meads", meadRouter);
export const api = functions.https.onRequest(app);
