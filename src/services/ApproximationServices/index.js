import config from "../../config";

const { step, gep, lambda, f } = config;
const { a, b } = gep;
const gapValue = b - a;
const stepsNumber = Math.round(gapValue / step);

class ApproximationServices {
  _findFk = (t, zCount) => {
    const fk = [];
    let FK = 0;
    for (let j = 0; j < zCount; j++) {
      let sum = 0;
      const t = j * step;
      for (let i = 1; i < zCount + 1; i++) {
        sum += Math.pow(t, i) * f(t);
      }
      fk.push(sum);
    }
    for (let j = 0; j < zCount - 1; j++) {
      FK += ((fk[j] + fk[j + 1]) / 2) * step;
    }
    return FK;
  };

  _findAk = (zCount, z) => {
    const fk = [];
    let FK = 0;
    for (let j = 0; j < zCount; j++) {
      let sum = 0;
      const t = j * step;
      for (let i = 2; i < zCount + 2; i++) {
        sum += z[i - 2] * Math.pow(t, i) * Math.pow(t, i - 1);
      }
      fk.push(sum);
    }
    for (let j = 0; j < zCount - 1; j++) {
      FK += ((fk[j] + fk[j + 1]) / 2) * step;
    }
    return FK;
  };

  _findC = (z) => {
    const zCount = z.length;

    const fk = this._findFk(zCount);
    const ak = this._findAk(zCount, z);

    console.log(fk);
    console.log(ak);

    return [0.4987, -0.16455, -0.5057];
  };

  polynomial = (z, { x, t }) => {
    const zCount = z.length;
    let sum = 0;

    for (let i = 2; i < zCount + 2; i++) {
      sum += z[i - 2] * Math.pow(x, i) * Math.pow(t, i - 1);
    }

    return sum;
  };

  polynomialWithOneVariable = (z, { x }) => {
    const zCount = z.length;
    let sum = 0;
    const c = this._findC(z);
    for (let i = 2; i < zCount + 2; i++) {
      sum += z[i - 2] * Math.pow(x, i) * c[i - 2];
    }
    return sum;
  };
}

const approximationServices = new ApproximationServices();

export default approximationServices;
