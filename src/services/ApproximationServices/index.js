class ApproximationServices {
  polynomial = (z, { x, t }) => {
    return z.reduce((answer, zValue, index) => {
      const adding =
        zValue * Math.pow(x, index) * Math.pow(t, z.length - 1 - index);
      return answer + adding;
    }, 0);
  };
}

const approximationServices = new ApproximationServices();

export default approximationServices;
