const config = {
  // y(x)+integral_0_to_1(x(e^xt-1)y(t))dt=e^x-x
  gep: { a: 0, b: 1 },
  step: 0.1,
  K: (x, t) => x * (Math.exp(x * t) - 1),
  f: (x) => Math.exp(x) - x,
  lambda: -1,
  epsilon: 0.001,
  K_: (x) =>
    Math.exp(x) - x - 0.50102 * x ** 2 - 0.14769 * x ** 3 - 0.06601 * x ** 4,
};
export default config;
