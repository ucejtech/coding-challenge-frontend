import { Router } from 'express';
import CallsController from '../controllers/Calls';
const router = Router();

router.get('/aggregate', CallsController.getCallsAggregate);

router.get('/:number', CallsController.getCallsByNumber);
export default router;
