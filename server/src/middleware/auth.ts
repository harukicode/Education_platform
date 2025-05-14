import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
      };
    }
  }
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-default-secret"
    ) as { id: string };

    req.user = { id: decoded.id };

    next();
  } catch (error) {
    console.error("Error in auth middleware:", error);
    res.status(401).json({ message: "Unauthorized" });
  }
};
