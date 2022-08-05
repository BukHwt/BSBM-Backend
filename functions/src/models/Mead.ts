import { ObjectId } from "mongodb";

export default interface Mead {
  _id?: ObjectId;
  brewName: string;
  style: string;
  author: string;
  authorUID: string;
  volume: number;
  brewDate: string;
  honey: string;
  honeyVariety: string;
  honeyAmount: number;
  base: string;
  baseAmount: number;
  OG: number;
  FG: number;
  recipe: string;
}
