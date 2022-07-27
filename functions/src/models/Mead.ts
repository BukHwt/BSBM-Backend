import { ObjectId } from "mongodb";

export default interface Mead {
  _id?: ObjectId;
  author: string;
  name: string;
}
