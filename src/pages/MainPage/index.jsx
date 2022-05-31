import { Button } from "antd";
import config from "../../config";
import approximationServices from "../../services/approximationServices";
import geneticServices from "../../services/geneticServices";
import historyServices from "../../services/historyServices";

const roundNumber = (value) => Math.round(value * 1000) / 1000;

const { f } = config;

const MainPage = () => {
  const calculate = () => {
    const { polynomial, polynomialWithOneVariable } = approximationServices;
    const generatedProperties = geneticServices.findParameters(3, polynomial);
    const dif = historyServices.getDifference();
    console.log(dif);
    console.log(generatedProperties);
    const yFunction = (x) =>
      f(x) - polynomialWithOneVariable(generatedProperties, { x });
    console.log(yFunction(0.2));
    console.log(yFunction(0.4));
    console.log(yFunction(0.6));
    console.log(yFunction(0.8));
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
