import config from "../../config";

const { step, gep, lambda, f } = config;
const { a, b } = gep;
const gapValue = b - a;
const stepsNumber = Math.round(gapValue / step);

class ApproximationServices {
  _deter = (A) => {
    var n = A.length,
      subA = [],
      detA = 0;
    if (n == 1) return A[0][0];
    if (n == 2) return A[0][0] * A[1][1] - A[0][1] * A[1][0];
    if (n == 3) {
      return (
        A[0][0] * A[1][1] * A[2][2] +
        A[0][1] * A[1][2] * A[2][0] +
        A[0][2] * A[1][0] * A[2][1] -
        (A[0][0] * A[1][2] * A[2][1] +
          A[0][1] * A[1][0] * A[2][2] +
          A[0][2] * A[1][1] * A[2][0])
      );
    }
    for (var i = 0; i < n; i++) {
      for (var h = 0; h < n - 1; h++) subA[h] = [];
      for (var a = 1; a < n; a++) {
        for (var b = 0; b < n; b++) {
          if (b < i) subA[a - 1][b] = A[a][b];
          else if (b > i) subA[a - 1][b - 1] = A[a][b];
        }
      }
      var sign = i % 2 == 0 ? 1 : -1;
      detA += sign * A[0][i] * Determinant(subA);
    }
    return detA;
  };

  _kramerMethod = ({ n, m, l }) => {
    const deter = this._deter(m);
    const c = l.map((a, i) => {
      const newM = m.map((row, index) => {
        if (index === i) return l;
        return row;
      });
      return this._deter(newM) / deter;
    });
    return c;
  };

  _findFk = ({ t, zCount }) => {};

  _findAk = ({ t, zCount, z }) => {};

  _findC = (z) => {
    const zCount = z.length;

    const fk = this._findFk({ zCount });
    const ak = this._findAk({ zCount, z });

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
