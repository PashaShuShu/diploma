class ApproximationServices {
  K_ = (z, x, t) =>
    z[0] * Math.pow(x, 2) +
    z[1] * Math.pow(x, 3) * Math.pow(t, 2) +
    z[2] * Math.pow(x, 4) * Math.pow(t, 3);
}

const approximationServices = new ApproximationServices();

export default approximationServices;
