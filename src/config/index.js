export default {
  // y(x)+integral_0_to_1(x(e^xt-1)y(t))dt=e^x-x
  gep: { a: 0, b: 1 },
  step: 0.05,
  K: (x, t) => x * (Math.exp(x * t) - 1),
  f: (x) => Math.exp(x),
  epsilon: 0.01,
};
