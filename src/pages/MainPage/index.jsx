import { Button, Row, Col } from "antd";
import { useState } from "react";
import approximationServices from "../../services/approximationServices";
import geneticServices from "../../services/geneticServices";
import historyServices from "../../services/historyServices";

const roundNumber = (value) => Math.round(value * 1000) / 1000;

const MainPage = () => {
  const [genAlgorithmRes, setGenAlgorithmRes] = useState([]);

  const calculate = () => {
    const approximatedFunction = approximationServices.polynomial;
    const generatedProperties = geneticServices.findParameters(
      2,
      approximatedFunction
    );

    const dif = historyServices.getDifference();
    console.log("Prop:", generatedProperties);

    setGenAlgorithmRes((old) => {
      return [
        ...old,
        {
          dif: dif.sort(),
          properties: generatedProperties,
        },
      ];
    });
  };

  const onCalculateClick = () => {
    calculate();
    historyServices.clearAll();
  };

  const onClearClick = () => {
    setGenAlgorithmRes([]);
  };

  return (
    <div>
      <h1>Main page</h1>
      <Button onClick={onCalculateClick}>Calculate</Button>{" "}
      <Button type="primary" onClick={onClearClick}>
        Clear
      </Button>
      {genAlgorithmRes.map((result, index) => {
        return (
          <Row key={index}>
            <Col span={8}>
              Dif: [
              {result.dif.map((value, index) => {
                return <span key={index}>{roundNumber(value)}; </span>;
              })}
              ]
            </Col>
            <Col span={8}>
              Prop: [
              {result.properties.map((value, index) => {
                return <span key={index}>{roundNumber(value)}; </span>;
              })}
              ]
            </Col>
          </Row>
        );
      })}
    </div>
  );
};

export default MainPage;
