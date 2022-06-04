import { Button } from "antd";
import { useState } from "react";
import config from "../../config";
import approximationServices from "../../services/approximationServices";
import geneticServices from "../../services/geneticServices";
import historyServices from "../../services/historyServices";
import Graphic from "../../components/Graphic";

const { f } = config;

const MainPage = () => {
  const [tableData, setTableData] = useState(null);

  const calculate = () => {
    const { polynomial, polynomialWithOneVariable } = approximationServices;
    const K_ = config.K_;
    const generatedProperties = geneticServices.findParameters(
      6,
      polynomial,
      100
    );
    const dif = historyServices.getDifference();
    const yFunction = (x) =>
      f(x) - polynomialWithOneVariable(generatedProperties, { x });

    setTableData({
      dif,
      generatedProperties,
      K_,
      yFunction,
    });
  };

  const onCalculateClick = () => {
    calculate();
    historyServices.clearAll();
  };

  const onClearClick = () => {
    setTableData(null);
  };

  return (
    <div>
      <h1>Main page</h1>
      <Button onClick={onCalculateClick}>Calculate</Button>{" "}
      <Button type="primary" onClick={onClearClick}>
        Clear
      </Button>
      {tableData && <Graphic tableData={tableData} />}
    </div>
  );
};

export default MainPage;
