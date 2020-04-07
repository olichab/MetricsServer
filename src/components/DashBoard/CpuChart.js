import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "react-vis/dist/style.css";
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  VerticalBarSeries,
  HorizontalGridLines,
} from "react-vis";
import { Container, Row, Col } from "reactstrap";
import { getDataCpuChart } from "../../store/metrics/metricsAction";
import "../../scss/DashBoard/CpuChart.scss";

export default function CpuChart() {
  const dataCpuChart = useSelector((state) => state.metrics.dataCpuChart);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDataCpuChart());
  }, [dispatch]);

  return (
    <Container className="container-cpu-chart">
      <Row>
        {dataCpuChart.map((e, i) => (
          <Col key={i} xs={6} md={4} className="my-auto">
            <XYPlot
              className="chart"
              xType="ordinal"
              width={170}
              height={130}
              color="#043c7c"
              colorType="literal"
              yDomain={(e[0]?.x).split(" ")[0] === "idl" ? [0, 100] : [0, 1]}
              yBaseValue={0}
            >
              <VerticalGridLines />
              <HorizontalGridLines />
              <XAxis />
              <YAxis />
              <VerticalBarSeries
                className="vertical-bar-series-example"
                data={dataCpuChart[i]}
              />
            </XYPlot>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
