//import config from "../../config/index";

import config from "../../config";

class GeneticServices {
  _getRandom = () =>
    Math.round(Math.random() * 10) % 2 === 0
      ? Math.random() * -1
      : Math.random();

  _getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max + 1);
    return Math.floor(Math.random() * (max - min)) + min;
  };

  _generateMatrixOfGapValues = () => {
    const { step, gep } = config;
    const { a, b } = gep;
    const gapValue = b - a;
    const stepsNumber = Math.round(gapValue / step);
    const matrixOfValues = [];
    for (let i = 0; i < stepsNumber; i++) {
      const a_i = a + i * step;
      for (let j = 0; j < stepsNumber; j++) {
        const b_j = b + j * step;
        matrixOfValues.push([a_i, b_j]);
      }
    }
    return matrixOfValues;
  };

  _generateParameters = (stepsNumber) => {
    const z = [];
    for (let i = 0; i < stepsNumber; i++) {
      z.push(this._getRandom());
    }
  };

  _findVectorOfDifference = (vectorA, vectorB) => {
    const vectorOfDifference = vectorA.map(
      (valueA, index) => valueA - vectorB[index]
    );
    return vectorOfDifference;
  };

  _findIndexesOfTheBestParameters = (vectorOfDifference, sliceQuantity) => {
    const vectorOfDifferenceWithIndexes = vectorOfDifference.map(
      (value, index) => ({ value, index })
    );
    const sortedVectorOfDifferenceWithIndexes =
      vectorOfDifferenceWithIndexes.sort((a, b) => a.value - b.value);
    const theBestParametersIndexes = sortedVectorOfDifferenceWithIndexes.map(
      ({ index }) => index
    );
    return theBestParametersIndexes.slice(0, sliceQuantity);
  };

  _findMaxDifferenceValue = (z, matrixOfValues, calculatePolynomial) => {
    const { K } = config;
    const polynomialValues = matrixOfValues.map(({ x, t }) => {
      return calculatePolynomial(z, { x, t });
    });
    const functionValues = matrixOfValues.map(({ x, t }) => {
      return K(x, t);
    });
    const vectorOfDifference = this._findVectorOfDifference(
      functionValues,
      polynomialValues
    );

    const sortedVectorOfDifference = vectorOfDifference.sort((a, b) => b - a);

    return sortedVectorOfDifference[0];
  };

  _generateNewGenerationsOfParameters = (
    baseGenerations,
    numbersOfMultiplying
  ) => {
    const newGenerations = [...baseGenerations];

    for (let i = 0; i < numbersOfMultiplying; i++) {
      baseGenerations.forEach((baseGeneration) => {
        const newParametersVector = baseGeneration.map((_, index) => {
          const indexOfGeneration = this._getRandomInt(0, numbersOfMultiplying);
          return baseGenerations[indexOfGeneration][index]; // can be error just swap places.
        });
        newGenerations.push(newParametersVector);
      });
    }
  };

  _generateParamsByGenetic = (
    { parametersZ, matrixesOfValues },
    currentCycleNumber,
    finishCycleNumber
  ) => {
    if (currentCycleNumber === finishCycleNumber) {
      return parametersZ;
    }

    const vectorOfDifferences = parametersZ.map((z) => {
      return this._findMaxDifferenceValue(
        z,
        matrixesOfValues,
        calculatePolynomial
      );
    });

    const theBestGenerationsIndexes = this._findIndexesOfTheBestParameters(
      vectorOfDifferences,
      100
    );

    if (vectorOfDifferences[theBestGenerationsIndexes[0]] <= config.epsilon) {
      return parametersZ;
    }

    const bestGeneration = theBestGenerationsIndexes.map(
      (index) => parametersZ[index]
    );

    const newGeneration = this._generateNewGenerationsOfParameters(
      bestGeneration,
      4
    );

    return this._generateParamsByGenetic(
      newGeneration,
      currentCycleNumber + 1,
      finishCycleNumber
    );
  };

  findParameters = (stepsNumber, calculatePolynomial) => {
    const matrixesOfValues = this._generateMatrixOfGapValues();
    const parametersZ = [];

    for (let i = 0; i < 400; i++) {
      parametersZ.push(this._generateParameters(stepsNumber));
    }

    const theBestGeneration = _generateParamsByGenetic(
      { parametersZ, matrixesOfValues },
      0,
      400
    );

    return theBestGeneration;
  };
}

const geneticServices = new GeneticServices();

export default geneticServices;
