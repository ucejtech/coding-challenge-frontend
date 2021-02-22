import { Router, Request, Response } from 'express';
import Responder from '../services/Responder';

const router = Router();
router.get('/', (req: Request, res: Response) => {
  Responder(res).success('Logs Route', {});
});

export default router;
