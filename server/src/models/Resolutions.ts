import Model from './Model';
import { ModelInterface } from '../@types/models/index';
import ResolutionsDb from '../json-data/resolution.json';

class Resolutions extends Model {
  private static instance: Resolutions;

  constructor(dataSource: ModelInterface[]) {
    super(dataSource);
  }

  static getInstance(): Resolutions {
    if (!this.instance) {
      this.instance = new this(ResolutionsDb);
      this.instance.flatten();
    }
    return this.instance;
  }
}

export default Resolutions;
