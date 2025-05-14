import * as mongoose from "mongoose";
import { IUser } from "../types/user";

const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  preferences: {
    technologies: {
      type: [String],
      default: [],
    },
    languages: [{
      type: String,
      enum: {
        values: ["en", "ru", "pl"],
        message: "{VALUE} is not a supported language"
      },
      default: []
    }]
  }
}, {timestamps: true});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
