//import config from "../../config/index";

import config from "../../config";
import historyServices from "../historyServices";

class GeneticServices {
  _getRandom = () =>
    Math.round(Math.random() * 10) % 2 === 0
      ? Math.random() * -1
      : Math.random();

  _getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  };

  _generateMatrixOfGapValues = () => {
    const { step, gep } = config;
    const { a, b } = gep;
    const gapValue = b - a;
    const stepsNumber = Math.round(gapValue / step);
    const matrixOfValues = [];
    for (let i = 0; i < stepsNumber; i++) {
      const t_i = a + i * step;
      for (let j = 0; j < stepsNumber; j++) {
        const t_j = a + j * step;
        matrixOfValues.push([t_i, t_j]);
      }
    }
    return matrixOfValues;
  };

  _generateParameters = (stepsNumber) => {
    const parameters = [];
    for (let i = 0; i < stepsNumber; i++) {
      parameters.push(this._getRandom());
    }
    return parameters;
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
    const polynomialValues = matrixOfValues.map(([x, t]) => {
      return calculatePolynomial(z, { x, t });
    });

    const functionValues = matrixOfValues.map(([x, t]) => {
      return K(x, t);
    });

    const vectorOfDifference = this._findVectorOfDifference(
      functionValues,
      polynomialValues
    );

    const sortedVectorOfDifference = vectorOfDifference
      .map((value) => Math.abs(value))
      .sort((a, b) => b - a);

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
          const indexOfGeneration = this._getRandomInt(
            0,
            baseGenerations.length
          );
          if (this._getRandomInt(0, baseGenerations.length * 2) === 6) {
            return this._getRandom;
          }
          return baseGenerations[indexOfGeneration][index]; // can be error just swap places.
        });
        newGenerations.push(newParametersVector);
      });
    }

    return newGenerations;
  };

  _generateParamsByGenetic = (
    { parameters, matrixesOfValues, calculatePolynomial },
    currentCycleNumber,
    finishCycleNumber
  ) => {
    const vectorOfDifferences = parameters.map((z) => {
      return this._findMaxDifferenceValue(
        z,
        matrixesOfValues,
        calculatePolynomial
      );
    });

    const theBestGenerationsIndexes = this._findIndexesOfTheBestParameters(
      vectorOfDifferences,
      parameters.length / 4
    );

    historyServices.pushDifference(
      vectorOfDifferences[theBestGenerationsIndexes[0]]
    );

    if (vectorOfDifferences[theBestGenerationsIndexes[0]] <= config.epsilon) {
      return parameters;
    }

    const bestGenerations = theBestGenerationsIndexes.map(
      (index) => parameters[index]
    );

    historyServices.pushGeneration(bestGenerations[0]);

    if (currentCycleNumber === finishCycleNumber) {
      return bestGenerations;
    }

    const newGenerations = this._generateNewGenerationsOfParameters(
      bestGenerations,
      3
    );

    return this._generateParamsByGenetic(
      { parameters: newGenerations, matrixesOfValues, calculatePolynomial },
      currentCycleNumber + 1,
      finishCycleNumber
    );
  };

  findParameters = (stepsNumber, calculatePolynomial, maxCycles = 400) => {
    const matrixesOfValues = this._generateMatrixOfGapValues();
    const parameters = [];

    for (let i = 0; i < 400; i++) {
      parameters.push(this._generateParameters(stepsNumber));
    }

    const theBestGeneration = this._generateParamsByGenetic(
      { parameters, matrixesOfValues, calculatePolynomial },
      0,
      maxCycles
    );

    return theBestGeneration[0];
  };
}

const geneticServices = new GeneticServices();

export default geneticServices;
