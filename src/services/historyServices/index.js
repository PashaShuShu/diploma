class HistoryServices {
  _differences = [];

  pushDifference = (value) => {
    this._differences = [...this._differences, value];
  };

  getDifference = () => this._differences;

  _generation = [];

  pushGeneration = (value) => {
    this._generation = [...this._generation, value];
  };

  getGeneration = () => this._generation;

  clearAll = () => {
    this._differences = [];
    this._generation = [];
  };
}

const historyServices = new HistoryServices();

export default historyServices;
