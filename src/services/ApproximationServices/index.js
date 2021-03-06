import config from "../../config";

const { step } = config;

class ApproximationServices {
  _deter = (A) => {
    var n = A.length,
      subA = [],
      detA = 0;
    if (n === 1) return A[0][0];
    if (n === 2) return A[0][0] * A[1][1] - A[0][1] * A[1][0];
    if (n === 3) {
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
      var sign = i % 2 === 0 ? 1 : -1;
      detA += sign * A[0][i] * this._deter(subA);
    }
    return detA;
  };

  _kramerMethod = ({ m, l }) => {
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

  _findIntegral = (values) => {
    const length = values.length;
    let sum = 0;
    for (let i = 0; i < length - 1; i++) {
      sum += ((values[i] + values[i + 1]) / 2) * step;
    }
    return sum;
  };

  _findFk = ({ zCount, k }) => {
    const fk_arr = [];
    for (let i = 0; i < zCount; i++) {
      const t = i * step;
      fk_arr.push(t ** k * config.f(t));
    }
    return this._findIntegral(fk_arr);
  };

  _findAk = ({ zCount, z, j, k }) => {
    const ak_arr = [];
    for (let i = 0; i < zCount; i++) {
      const t = i * step;
      ak_arr.push(z * t ** k * t ** j);
    }
    return this._findIntegral(ak_arr);
  };

  _findC = (z) => {
    const zCount = z.length;
    const fk = [];
    const ak = [];
    for (let i = 0; i < zCount; i++) {
      fk.push(this._findFk({ zCount, k: i + 1 }));

      const akj = [];
      for (let j = 0; j < zCount; j++) {
        akj.push(this._findAk({ zCount, z: z[i], j: j + 2, k: i + 1 }));
      }
      ak.push(akj);
    }

    const m = ak.map((a, index) => {
      return a.map((s, index_) => {
        if (index === index_) {
          return -1 * s * config.lambda + 1;
        }
        return -1 * s;
      });
    });
    console.log(m);
    console.log(fk);
    const c = this._kramerMethod({ m, l: fk });
    return c;
  };

  polynomial = (z, { x, t }) => {
    const zCount = z.length;
    let sum = 0;

    for (let i = 0; i < zCount; i++) {
      sum += z[i] * x ** (i + 2) * t ** (i + 1);
    }

    return sum;
  };

  polynomialWithOneVariable = (z, x) => {
    const zCount = z.length;
    let sum = 0;
    // const c = this._findC([1.00923, 0.443055, 0.26401]);
    // const c = this._findC(z);
    const c = [0.4987, -0.16455, -0.05057];
    // console.log(c);
    sum += x ** 2 * c[0] * config.lambda;
    for (let i = 1; i < zCount; i++) {
      sum += x ** (i + 2) * c[i];
    }
    return sum;
  };
}

const approximationServices = new ApproximationServices();

export default approximationServices;
