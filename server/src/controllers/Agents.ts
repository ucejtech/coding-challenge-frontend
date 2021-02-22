import { Request, Response } from 'express';
import Responder from '../services/Responder';
import Agents from './../models/Agents';
import Logs from '../models/Logs';
import { ModelInterface } from '../@types/models/index';
import { formatDate } from '../util/formatDate';
import Resolutions from '../models/Resolutions';

class AgentsController {
  static getCallsByAgent(req: Request, res: Response) {
    const agent = Agents.getInstance().flatData[req.params.id];

    if (!agent) {
      return Responder(res).error(404, 'AgentNotFound', 'Agent Not Found');
    }

    const agentLogs: ModelInterface[] = [];

    for (const callLog of Logs.getInstance().findAll()) {
      if (callLog.agentIdentifier !== agent.identifier) {
        continue;
      }
      agentLogs.push({
        number: callLog.number,
        dateTime: formatDate(callLog.dateTime || '', true),
        resolution: Resolutions.getInstance().flatData[callLog.identifier || '']
          .resolution
      });
    }

    Responder(res).success('Logs Route', {
      agent,
      logs: agentLogs
    });
  }
}

export default AgentsController;
