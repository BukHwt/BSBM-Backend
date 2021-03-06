import express from "express";
import { getClient } from "../db";
import User from "../models/User";

const userRouter = express.Router();

const errorResponse = (error: any, res: any) => {
  console.error("FAIL", error);
  res.status(500).json({ message: "Internal Server Error" });
};

userRouter.get("/", async (req, res) => {
  try {
    const client = await getClient();
    const results = await client
      .db()
      .collection<User>("users")
      .find()
      .toArray();
    res.json(results);
  } catch (err) {
    errorResponse(err, res);
  }
});

userRouter.get("/:uid", async (req, res) => {
  try {
    const uid: string = req.params.uid;
    const client = await getClient();
    const result = await client.db().collection<User>("users").findOne({ uid });
    res.json(result);
  } catch (err) {
    errorResponse(err, res);
  }
});

userRouter.post("/", async (req, res) => {
  try {
    const newUser: User = req.body;
    const client = await getClient();
    await client.db().collection<User>("users").insertOne(newUser);
    res.status(201).json(newUser);
  } catch (err) {
    errorResponse(err, res);
  }
});

export default userRouter;
