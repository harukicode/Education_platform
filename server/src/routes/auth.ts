import { Router } from 'express';
import { login, refreshToken } from "../controllers/auth";
import { register } from "../controllers/register";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/refresh-token", authMiddleware, refreshToken);

export default router;