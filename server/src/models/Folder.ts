import * as mongoose from "mongoose";
import { IFolder } from "../types/folder";

const folderSchema = new mongoose.Schema<IFolder>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: [2, "Folder name must be at least 2 characters long"],
  },
  description: String
}, { timestamps: true });

folderSchema.index({ userId: 1, name: 1 }, { unique: true });

const Folder = mongoose.model<IFolder>("Folder", folderSchema);

export default Folder;