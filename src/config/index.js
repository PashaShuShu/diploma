const config = {
  // y(x)+integral_0_to_1(x(e^xt-1)y(t))dt=e^x-x
  gep: { a: 0, b: 1 },
  step: 0.1,
  K: (x, t) => Math.cos(x * t),
  f: (x) => Math.cos(x),
  lambda: -0.5,
  epsilon: 0.001,
  K_: (x) =>
    Math.cos(x) +
    0.8022936 -
    0.120623 * Math.pow(x, 2) +
    0.00549 * Math.pow(x, 4),
};
export default config;
