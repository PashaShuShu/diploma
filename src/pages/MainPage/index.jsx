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
      6,
      approximatedFunction
    );

    const dif = historyServices.getDifference();
    const gen = historyServices.getGeneration();
    const length = dif.length;

    console.log("Dif:", dif[length - 1]);
    console.log("Gen:", gen[length - 1]);

    console.log("Prop:", generatedProperties);

    setGenAlgorithmRes((old) => {
      return [
        ...old,
        {
          dif: dif[length - 1],
          gen: gen[length - 1],
          properties: generatedProperties,
        },
      ];
    });
  };

  const onButtonClick = () => {
    calculate();
  };

  return (
    <div>
      <h1>Main page</h1>
      <Button onClick={onButtonClick}>Calculate</Button>
      {genAlgorithmRes.map((result, index) => {
        return (
          <Row key={index}>
            <Col span={8}>Dif: {roundNumber(result.dif)}</Col>
            <Col span={8}>
              Gen: [
              {result.gen.map((value, index) => {
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
