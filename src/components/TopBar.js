import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Button, ButtonGroup } from "reactstrap";
import Select from "react-select";
import Calendar from "./Calendar";
import {
  getFilesList,
  getInodesList,
  filterMetricsByParam,
  selectLoadAvg,
  getAvgLoadAvg,
  selectRowMetrics,
  getInfosMemoryUsed,
  getInfosNetworkTransfer,
  getInfosDiskUtilization,
} from "../store/metrics/metricsAction";
import "../scss/TopBar.scss";

export default function TopBar() {
  const [selectValueFile, setSelectValueFile] = useState(null);
  const [selectValueInode, setSelectValueInode] = useState(null);
  const filesList = useSelector((state) => state.metrics.filesList);
  const inodesList = useSelector((state) => state.metrics.inodesList);
  const loadAvgFilter = useSelector((state) => state.metrics.loadAvgFilter);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFilesList());
    dispatch(getInodesList());
  }, [dispatch]);

  const _handleClick = (loadAvgSelected) => {
    dispatch(selectLoadAvg(loadAvgSelected));
    dispatch(getAvgLoadAvg(loadAvgSelected));
  };

  const _handleSelectChange = (e, action) => {
    dispatch(selectRowMetrics(-1, -1));
    if (action.name === "select_file") {
      setSelectValueFile(e);
      setSelectValueInode(null);
      dispatch(filterMetricsByParam(e?.value, "files"));
    } else if (action.name === "select_inode") {
      dispatch(filterMetricsByParam(e?.value, "inodes"));
      setSelectValueFile(null);
      setSelectValueInode(e);
    }
    dispatch(getInfosMemoryUsed());
    dispatch(getInfosNetworkTransfer());
    dispatch(getInfosDiskUtilization());
  };

  return (
    <Container className="container-top-bar" fluid>
      <Row className="align-items-end">
        <Col xs="6" md="auto">
          <Calendar />
        </Col>
        <Col xs="6" md="auto">
          <p>Load average</p>
          <ButtonGroup>
            <Button
              className="btn-load-avg"
              onClick={() => _handleClick("oneMin")}
              active={loadAvgFilter === "oneMin"}
            >
              1m
            </Button>
            <Button
              className="btn-load-avg"
              onClick={() => _handleClick("fiveMin")}
              active={loadAvgFilter === "fiveMin"}
            >
              5m
            </Button>
            <Button
              className="btn-load-avg"
              onClick={() => _handleClick("fifteenMin")}
              active={loadAvgFilter === "fifteenMin"}
            >
              15m
            </Button>
          </ButtonGroup>
        </Col>
        <Col xs="6" md="auto">
          <p>Files</p>
          <Select
            key={`key__${selectValueFile}`}
            name={"select_file"}
            placeholder="Select file"
            className="react-select-container"
            classNamePrefix="react-select"
            options={filesList}
            noOptionsMessage={() => "No files found"}
            value={selectValueFile}
            onChange={_handleSelectChange}
            isClearable
          />
        </Col>
        <Col xs="6" md="auto">
          <p>Inodes</p>
          <Select
            key={`key__${selectValueInode}`}
            name={"select_inode"}
            placeholder="Select inode"
            options={inodesList}
            noOptionsMessage={() => "No files found"}
            className="react-select-container"
            classNamePrefix="react-select"
            value={selectValueInode}
            onChange={_handleSelectChange}
            isClearable
          />
        </Col>
      </Row>
    </Container>
  );
}
