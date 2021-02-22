import { Router } from 'express';
import AgentsController from '../controllers/Agents';

const router = Router();

router.get('/:id', AgentsController.getCallsByAgent);

export default router;
