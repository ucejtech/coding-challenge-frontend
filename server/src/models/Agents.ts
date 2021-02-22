import Model from './Model';
import { ModelInterface } from '../@types/models/index';
import AgentsDb from '../json-data/agents.json';

class Agents extends Model {
  private static instance: Agents;

  private constructor(dataSource: ModelInterface[]) {
    super(dataSource);
  }

  static getInstance(): Agents {
    if (!this.instance) {
      this.instance = new this(AgentsDb);
      this.instance.flatten();
    }
    return this.instance;
  }
}

export default Agents;
