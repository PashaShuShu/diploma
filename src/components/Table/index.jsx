import { Row, Col } from "antd";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const roundNumber = (value) => Math.round(value * 1000) / 1000;

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Порівняння графіків",
    },
  },
};

const Table = ({ tableData }) => {
  const labels = [];
  const data1 = [];
  const data2 = [];
  const step = 0.1;
  const start = -0.1;

  for (let i = 0; i <= 11; i++) {
    const value = roundNumber(start + step * i);
    labels.push(`${value}`);
    data1.push(tableData.yFunction(value));
    data2.push(tableData.K_(value));
  }

  const data = {
    labels,
    datasets: [
      {
        label: "K function",
        data: data2,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "My function",
        data: data1,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <Row>
      <Col span={24}>
        <b>Dif: </b>[{tableData.dif.join("; ")}]
      </Col>
      <Col span={24}>
        <b>Gens: </b> (
        {tableData.generatedProperties.map((a) => roundNumber(a)).join("; ")})
      </Col>
      <Col>
        <Line
          style={{ height: "100px", width: "100vh" }}
          options={options}
          data={data}
        />
        ;
      </Col>
    </Row>
  );
};

export default Table;
