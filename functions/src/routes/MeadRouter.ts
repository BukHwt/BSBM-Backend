import express from "express";
import { ObjectID } from "mongodb";
import { getClient } from "../db";
import Mead from "../models/Mead";

const meadRouter = express.Router();

const errorResponse = (error: any, res: any) => {
  console.error("FAIL", error);
  res.status(500).json({ message: "Internal Server Error" });
};

meadRouter.get("/", async (req, res) => {
  try {
    const client = await getClient();
    const results = await client
      .db()
      .collection<Mead>("meads")
      .find()
      .toArray();
    res.json(results);
  } catch (err) {
    errorResponse(err, res);
  }
});

// Research FindOne and fix function

meadRouter.get("/:_id", async (req, res) => {
  try {
    const _id: any = req.params._id;
    const client = await getClient();
    const results = await client.db().collection<Mead>("meads").find({ _id });
    res.json(results);
  } catch (err) {
    errorResponse(err, res);
  }
});

meadRouter.post("/", async (req, res) => {
  try {
    const newMead: Mead = req.body;
    const client = await getClient();
    await client.db().collection<Mead>("meads").insertOne(newMead);
    res.status(201).json(newMead);
  } catch (err) {
    errorResponse(err, res);
  }
});

meadRouter.delete("/:id", async (req, res) => {
  try {
    const id: string = req.params.id;
    const client = await getClient();
    const results = await client
      .db()
      .collection<Mead>("meads")
      .deleteOne({ id });
    if (results.deletedCount) {
      res.sendStatus(204);
    } else {
      res.status(404).send(`ID ${id} not found`);
    }
  } catch (err) {
    errorResponse(err, res);
  }
});

export default meadRouter;
