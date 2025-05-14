import { Types } from "mongoose";

export interface IFolder {
  _id?: string;
  userId: Types.ObjectId | string;
  name: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}