import React from "react";
import { Container, Row, Col } from "reactstrap";
import CpuUsage from "./DashBoard/CpuUsage";
import MemoryUsed from "./DashBoard/MemoryUsed";
import NetworkTransfer from "./DashBoard/NetworkTransfer";
import DiskUtilization from "./DashBoard/DiskUtilization";
import MetricsExplorer from "./DashBoard/MetricsExplorer";
import "../scss/DashBoard.scss";

export default function DashBoard() {
  return (
    <div>
      <Container className="container-dashboard">
        <Row>
          <Col xs={{ size: 12, order: 2 }} lg={{ size: 4, order: 1 }}>
            <CpuUsage />
            <MemoryUsed />
            <NetworkTransfer />
            <DiskUtilization />
          </Col>
          <Col xs={{ size: 12, order: 1 }} lg={{ size: 8, order: 2 }}>
            <MetricsExplorer />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
