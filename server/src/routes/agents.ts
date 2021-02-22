import { Router, Request, Response } from 'express';
import Responder from '../services/Responder';
import Agents from './../models/Agents';

const router = Router();
router.get('/:id', (req: Request, res: Response) => {
  Responder(res).success(
    'Logs Route',
    Agents.getInstance().find('identifier', req.params.id)
  );
});

export default router;
