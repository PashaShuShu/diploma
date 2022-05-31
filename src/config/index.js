export default {
  // y(x)+integral_0_to_1(x(e^xt-1)y(t))dt=e^x-x
  gep: { a: 0, b: 1 },
  step: 0.1,
  K: (x, t) => x * (Math.exp(x * t) - 1),
  f: (x) => Math.exp(x) - x,
  epsilon: 0.01,
};
