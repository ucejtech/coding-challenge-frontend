import { Router, Request, Response } from 'express';
import Responder from '../services/Responder';
import Logs from '../models/Logs';
import { formatDate } from '../util/formatDate';
import Agents from '../models/Agents';
import { ModelInterface } from '../@types/models/index';

const router = Router();

function getLatestCall(logs) {
  return logs.reduce((previousCall, currentCall) =>
    Date.parse(previousCall.dateTime) > Date.parse(currentCall.dateTime)
      ? previousCall
      : currentCall
  );
}

router.get('/aggregate', (_req: Request, res: Response) => {
  const logs = Logs.getInstance().findAll();
  const record = {};
  logs.map((x) => {
    if (!record[x.number || '']) {
      record[x.number || ''] = [x];
    } else {
      record[x.number || ''].push(x);
    }
  });

  const callAggregate: ModelInterface[] = [];

  Object.keys(record).map((x) => {
    const lastCallParty = getLatestCall(record[x]);
    const agent = Agents.getInstance().flatData[lastCallParty.agentIdentifier];
    const phoneCallLog = {
      number: x,
      totalCalls: record[x].length,
      lastCall: {
        date: formatDate(lastCallParty.dateTime),
        agentIdentifier: agent.identifier,
        name: agent.firstName + ' ' + agent.lastName
      }
    };
    callAggregate.push(phoneCallLog);
  });
  Responder(res).success('Calls Route', callAggregate);
});

export default router;
