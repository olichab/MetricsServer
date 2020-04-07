import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Progress } from "reactstrap";
import { getInfosMemoryUsed } from "../../store/metrics/metricsAction";
import "../../scss/DashBoard/MemoryUsed.scss";

export default function MemoryUsed() {
  const infosMemoryUsed = useSelector((state) => state.metrics.infosMemoryUsed);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getInfosMemoryUsed());
  }, [dispatch]);

  return (
    <Container className="container-memory-used">
      <Row>
        <Col>
          <h5>Memory used</h5>
          {infosMemoryUsed?.map((e) => (
            <Fragment key={e.id}>
              <Progress multi>
                <Progress bar value={e.used.percentage} className="bar-used" />
                <Progress bar value={e.buff.percentage} className="bar-buff" />
                <Progress bar value={e.cach.percentage} className="bar-cach" />
              </Progress>
              <Row className="infos-memory-used">
                <Col xs="6">
                  <p>
                    <span className="label-used">Used : </span>
                    {e.used.value}
                  </p>
                </Col>
                <Col xs="6">
                  <p>
                    <span className="label-buff">Buff : </span>
                    {e.buff.value}
                  </p>
                </Col>
                <Col xs="6">
                  <p>
                    <span className="label-cach">Cach : </span>
                    {e.cach.value}
                  </p>
                </Col>
                <Col xs="6">
                  <p>
                    <span className="label-free">Free : </span>
                    {e.free.value}
                  </p>
                </Col>
              </Row>
            </Fragment>
          ))}
        </Col>
      </Row>
    </Container>
  );
}
