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
    const K = config.K;
    const generatedProperties = geneticServices.findParameters(
      20,
      polynomial,
      100
    );
    const dif = historyServices.getDifference();
    console.log(dif);
    console.log("dif1", dif[dif.length - 3]);
    console.log("dif2", dif[dif.length - 2]);
    console.log("dif3", dif[dif.length - 1]);
    console.log("z", generatedProperties);
    const yFunction = (x) =>
      f(x) - polynomialWithOneVariable(generatedProperties, { x });
    console.log("me:", yFunction(0.2));
    console.log("real:", K(0.2));

    console.log("me:", yFunction(0.4));
    console.log("real:", K(0.4));

    console.log("me:", yFunction(0.6));
    console.log("real:", K(0.6));

    console.log("me:", yFunction(0.8));
    console.log("real:", K(0.8));

    console.log("me:", yFunction(1));
    console.log("real:", K(1));
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
