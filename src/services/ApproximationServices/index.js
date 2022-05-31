class ApproximationServices {
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

    for (let i = 2; i < zCount + 2; i++) {
      sum += z[i - 2] * Math.pow(x, i);
    }
    return sum;
  };
}

const approximationServices = new ApproximationServices();

export default approximationServices;
