import { Request, Response } from 'express';
import Responder from '../services/Responder';
import Logs from '../models/Logs';
import { formatDate, formatDuration } from '../util/formatDate';
import Agents from '../models/Agents';
import { ModelInterface } from '../@types/models/index';
import Resolutions from '../models/Resolutions';

function getLastCall(logs) {
  return logs.reduce((previousCall, currentCall) =>
    Date.parse(previousCall.dateTime) > Date.parse(currentCall.dateTime)
      ? previousCall
      : currentCall
  );
}

class CallsController {
  static getCallsAggregate(_req: Request, res: Response) {
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
      const lastCallParty = getLastCall(record[x]);
      const agent = Agents.getInstance().flatData[
        lastCallParty.agentIdentifier
      ];
      const phoneCallLog = {
        number: x,
        totalCalls: record[x].length,
        lastCall: {
          duration: formatDuration(lastCallParty.duration),
          agentIdentifier: agent.identifier,
          name: agent.firstName + ' ' + agent.lastName
        }
      };
      callAggregate.push(phoneCallLog);
    });
    Responder(res).success('Calls Aggregate', callAggregate);
  }

  static getCallsByNumber(req: Request, res: Response) {
    const callLogs = Logs.getInstance().filter('number', req.params.number);

    if (callLogs.length < 1) {
      return Responder(res).error(
        404,
        'NumberNotFound',
        `No Call log recorded for ${req.params.number}`
      );
    }

    const logsAndResolutinons: ModelInterface[] = [];

    for (const callLog of callLogs) {
      logsAndResolutinons.push({
        lastName: Agents.getInstance().flatData[callLog.agentIdentifier || '']
          .lastName,
        firstName: Agents.getInstance().flatData[callLog.agentIdentifier || '']
          .firstName,
        dateTime: formatDate(callLog.dateTime || '', true),
        resolution: Resolutions.getInstance().flatData[callLog.identifier || '']
          .resolution
      });
    }

    Responder(res).success('Logs Route', logsAndResolutinons);
  }
}

export default CallsController;
