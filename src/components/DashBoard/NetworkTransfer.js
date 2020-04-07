import React, { useEffect, Fragment } from "react";
import { Container, Row, Col } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { getInfosNetworkTransfer } from "../../store/metrics/metricsAction";

import "../../scss/DashBoard/NetworkTransfer.scss";

export default function NetworkTransfer() {
  const infosNetworkTransfer = useSelector(
    state => state.metrics.infosNetworkTransfer
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getInfosNetworkTransfer());
  }, [dispatch]);

  return (
    <Container className="container-network-transfer">
      <Row>
        <Col>
          <h5>Network transfer</h5>
          {infosNetworkTransfer.map(e => (
            <Fragment key={e.id}>
              <p>Received : {e.received}</p>
              <p>Send : {e.send}</p>
            </Fragment>
          ))}
        </Col>
      </Row>
    </Container>
  );
}
