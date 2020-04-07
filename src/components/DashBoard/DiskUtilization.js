import React, { useEffect, Fragment } from "react";
import { Container, Row, Col } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { getInfosDiskUtilization } from "../../store/metrics/metricsAction";
import "../../scss/DashBoard/DiskUtilization.scss";

export default function DiskUtilization() {
  const infosDiskUtilization = useSelector(
    state => state.metrics.infosDiskUtilization
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getInfosDiskUtilization());
  }, [dispatch]);

  return (
    <Container className="container-disk-utilization">
      <Row>
        <Col>
          <h5>Disk utilization</h5>
          {infosDiskUtilization.map(e => (
            <Fragment key={e.id}>
              <p>Read : {e.read}</p>
              <p>Write : {e.writ}</p>
            </Fragment>
          ))}
        </Col>
      </Row>
    </Container>
  );
}
