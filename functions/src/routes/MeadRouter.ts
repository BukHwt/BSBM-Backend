import express from "express";
import { ObjectId } from "mongodb";
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

meadRouter.get("/:id", async (req, res) => {
  try {
    const client = await getClient();
    const results = await client
      .db()
      .collection<Mead>("meads")
      .findOne({ _id: new ObjectId(req.params.id) });
    res.json(results);
  } catch (err) {
    errorResponse(err, res);
  }
});

meadRouter.get("/yourbrews/:authorUID", async (req, res) => {
  try {
    const client = await getClient();
    const results = await client
      .db()
      .collection<Mead>("meads")
      .find({ authorUID: req.params.authorUID })
      .toArray();
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

meadRouter.put("/:id", async (req, res) => {
  try {
    const updatedMead: Mead = req.body;
    const client = await getClient();
    await client
      .db()
      .collection<Mead>("meads")
      .updateOne({ _id: new ObjectId(req.params.id) }, updatedMead);
    res.status(200).json(updatedMead);
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
