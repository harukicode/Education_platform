import { Request, Response } from "express";
import { LoginRequest, AuthResponse } from "../types/auth";
import User from "../models/User";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

export const login = async (
  req: Request<{}, {}, LoginRequest>,
  res: Response<AuthResponse>
): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Please fill all fields" });
      return;
    }

    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "your-default-secret",
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const refreshToken = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "your-default-secret",
      { expiresIn: "7d" }
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error("Error refreshing token:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
