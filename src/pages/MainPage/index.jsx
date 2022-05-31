import { Button } from "antd";
import { useEffect, useState } from "react";
import config from "../../config";
import approximationServices from "../../services/approximationServices";
import geneticServices from "../../services/geneticServices";
import historyServices from "../../services/historyServices";

const roundNumber = (value) => Math.round(value * 1000) / 1000;

const { f } = config;

const MainPage = () => {
  const calculate = () => {
    const { polynomial, polynomialWithOneVariable } = approximationServices;
    const generatedProperties = geneticServices.findParameters(2, polynomial);
    const dif = historyServices.getDifference();

    const yFunction = (x) =>
      f(x) - polynomialWithOneVariable(generatedProperties, { x });
    console.log(yFunction(0));
    console.log(yFunction(1));
  };

  const onCalculateClick = () => {
    calculate();
    historyServices.clearAll();
  };

  const onClearClick = () => {};

  return (
    <div>
      <h1>Main page</h1>
      <Button onClick={onCalculateClick}>Calculate</Button>{" "}
      <Button type="primary" onClick={onClearClick}>
        Clear
      </Button>
    </div>
  );
};

export default MainPage;
