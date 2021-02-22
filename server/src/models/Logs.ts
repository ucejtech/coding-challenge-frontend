import Model from './Model';
import { ModelInterface } from '../@types/models/index';
import LogsDb from '../json-data/logs.json';

class Logs extends Model {
  private static instance: Logs;

  constructor(dataSource: ModelInterface[]) {
    super(dataSource);
  }

  static getInstance(): Logs {
    if (!this.instance) {
      this.instance = new this(LogsDb);
      this.instance.flatten();
    }
    return this.instance;
  }
}

export default Logs;
