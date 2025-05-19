import { Router } from 'express';
import { searchRepositories, getRepository } from '../controllers/github';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// GET /api/github/search?q=react&language=javascript
router.get('/search', authMiddleware, searchRepositories);

// GET /api/gitHub/repos/facebook/react
router.get('/repos/:owner/:repo', authMiddleware, getRepository);

export default router;