import { ModelInterface } from '../@types/models/index';

class Model {
  private dataSource: ModelInterface[] = [];
  private flattenedData: Record<string, ModelInterface> = {};

  constructor(dataSource: ModelInterface[]) {
    this.dataSource = dataSource;
  }

  find(key: string, value: string | number) {
    const result = this.dataSource.find((x) => x[key] === value);
    return result || {};
  }

  findAll() {
    return this.dataSource;
  }

  filter(key: string, value: string | number) {
    return this.dataSource.filter((x) => x[key] === value);
  }

  flatten() {
    return this.dataSource.map((x) => {
      this.flattenedData[x.identifier || ''] = x;
    });
  }

  get flatData() {
    return this.flattenedData;
  }
}

export default Model;
