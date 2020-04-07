import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Table } from "reactstrap";
import { getInfosCpuUsage } from "../../store/metrics/metricsAction";

import "../../scss/DashBoard/CpuUsage.scss";

export default function CpuUsage() {
  const infosCpuUsage = useSelector(state => state.metrics.infosCpuUsage);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getInfosCpuUsage());
  }, [dispatch]);

  return (
    <Container className="container-cpu-usage">
      <Row>
        <Col>
          <h5>CPU usage (%)</h5>
          <Table striped>
            <thead>
              <tr>
                <th />
                <th>Min</th>
                <th>Max</th>
                <th>Avg</th>
              </tr>
            </thead>
            <tbody>
              {infosCpuUsage?.map(e => (
                <Fragment key={e.id}>
                  <tr>
                    <th>Usr</th>
                    <td>{e.usr.min}</td>
                    <td>{e.usr.max}</td>
                    <td>{e.usr.avg}</td>
                  </tr>
                  <tr>
                    <th>Sys</th>
                    <td>{e.sys.min}</td>
                    <td>{e.sys.max}</td>
                    <td>{e.sys.avg}</td>
                  </tr>
                  <tr>
                    <th>Idl</th>
                    <td>{e.idl.min}</td>
                    <td>{e.idl.max}</td>
                    <td>{e.idl.avg}</td>
                  </tr>
                  <tr>
                    <th>Wai</th>
                    <td>{e.wai.min}</td>
                    <td>{e.wai.max}</td>
                    <td>{e.wai.avg}</td>
                  </tr>
                  <tr>
                    <th>Hiq</th>
                    <td>{e.hiq.min}</td>
                    <td>{e.hiq.max}</td>
                    <td>{e.hiq.avg}</td>
                  </tr>
                  <tr>
                    <th>Siq</th>
                    <td>{e.siq.min}</td>
                    <td>{e.siq.max}</td>
                    <td>{e.siq.avg}</td>
                  </tr>
                </Fragment>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}
