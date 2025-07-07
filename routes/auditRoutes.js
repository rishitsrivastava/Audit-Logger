import express from 'express';

import replaySession from '../controllers/replayController.js';

const router = express.Router();

router.get('/replay/:sessionId', replaySession);

export default router;