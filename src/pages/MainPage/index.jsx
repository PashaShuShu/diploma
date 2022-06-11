import { Button } from "antd";
import { useState } from "react";
import config from "../../config";
import approximationServices from "../../services/approximationServices";
import geneticServices from "../../services/geneticServices";
import Graphic from "../../components/Graphic";


const MainPage = () => {
  const [tableData, setTableData] = useState(null);

  const calculate = () => {
    const { polynomial, polynomialWithOneVariable } = approximationServices;
    const K_ = config.K_;
    const generatedProperties = geneticServices.findParameters(
      3,
      polynomial,
      10
    );
    const yFunction = (x) =>
      config.f(x) +
      config.lambda * polynomialWithOneVariable(generatedProperties, x);

    setTableData({
      generatedProperties,
      K_,
      yFunction,
    });
  };

  const onCalculateClick = () => {
    calculate();
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
