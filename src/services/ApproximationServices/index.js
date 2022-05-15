class ApproximationServices {
  polynomial = (z, { x, t }) => {
    const zCount = Math.sqrt(z.length);
    let sum = 0;
    let zIndex = 0;

    for (let i = 0; i < zCount; i++) {
      for (let j = 0; j < zCount; j++) {
        sum += z[zIndex] * Math.pow(x, i) * Math.pow(t, j);
        zIndex += 1;
      }
    }
    return sum;
  };
}

const approximationServices = new ApproximationServices();

export default approximationServices;
