import config from "../../config/index";

class GeneticServices {
  _getRandom = () =>
    Math.round(Math.random() * 10) % 2 === 0
      ? Math.random() * -1
      : Math.random();

  _generateMatrixOfGapValues = (gep, step) => {
    const { a, b } = gep;
    const gapValue = b - a;
    const stepsNumber = Math.round(gapValue / step);
    const matrixOfValues = [];
    for (let i = 0; i < stepsNumber; i++) {
      const a_i = a + i * step;
      for (let j = 0; j < stepsNumber; j++) {
        const b_j = b + j * step;
        matrixOfValues.push([a_i, b_j]);
      }
    }
    return matrixOfValues;
  };

  findParameters = (stepsNumber, calculatePolynomial) => {
    const { step, gep } = config;

    const z = [];
    for (let i = 0; i < stepsNumber; i++) {
      z.push(this._getRandom());
    }

    return z;
  };
}

const geneticServices = new GeneticServices();

export default geneticServices;
