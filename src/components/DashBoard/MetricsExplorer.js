import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import {
  AutoSizer,
  Column,
  Table,
  defaultTableRowRenderer,
} from "react-virtualized";
import {
  getMetricsList,
  sortMetricsAscDesc,
  selectRowMetrics,
  getAvgLoadAvg,
  getInfosMemoryUsed,
  getInfosNetworkTransfer,
  getInfosDiskUtilization,
} from "../../store/metrics/metricsAction";
import CpuChart from "./CpuChart";
import "react-virtualized/styles.css";
import "../../scss/DashBoard/MetricsExplorer.scss";

export default function MetricsExplorer() {
  const tableRef = useRef();
  const metricsListFiltered = useSelector(
    (state) => state.metrics.metricsListFiltered
  );
  const loadAvgFilter = useSelector((state) => state.metrics.loadAvgFilter);
  const avgLoadAvg = useSelector((state) => state.metrics.avgLoadAvg);
  const sortBy = useSelector((state) => state.metrics.sortBy);
  const sortDirection = useSelector((state) => state.metrics.sortDirection);
  const idItemsSelect = useSelector((state) => state.metrics.idItemsSelect);
  const idRowSelect = useSelector((state) => state.metrics.idRowSelect);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMetricsList());
    dispatch(getAvgLoadAvg(loadAvgFilter));
  }, [dispatch, loadAvgFilter]);
  useEffect(() => {
    tableRef.current.recomputeRowHeights();
  }, [idItemsSelect]);

  const _getRowHeight = ({ index }) => (index === idRowSelect ? 400 : 32);

  const _onRowClick = (props) => {
    const { index, rowData } = props;
    if (rowData.id === idItemsSelect) {
      dispatch(selectRowMetrics(-1, -1));
    } else {
      dispatch(selectRowMetrics(rowData.id, index));
    }
    dispatch(getInfosMemoryUsed());
    dispatch(getInfosNetworkTransfer());
    dispatch(getInfosDiskUtilization());
  };

  const _rowRenderer = (props) => {
    const { style, className, key, rowData } = props;
    if (rowData.id === idItemsSelect) {
      return (
        <div
          style={{
            ...style,
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#fff",
          }}
          className={className}
          key={key}
        >
          {defaultTableRowRenderer({
            ...props,
            style: { width: style.width, height: "48px" },
          })}
          <div
            style={{
              marginTop: "0",
              height: 48,
            }}
          >
            <h5 className="title-cpu-chart">Cpu details</h5>
            <CpuChart />
          </div>
        </div>
      );
    }
    return defaultTableRowRenderer(props);
  };

  const _cellRenderer = (props) => {
    const { cellData } = props;
    if (cellData > avgLoadAvg) {
      return (
        <div
          style={{
            color: "#d91e18",
          }}
        >
          {cellData}
        </div>
      );
    }
    return (
      <div
        style={{
          color: "#26a65b",
        }}
      >
        {cellData}
      </div>
    );
  };

  const _noRowsRenderer = () => {
    return <div className="noRows">No results found</div>;
  };

  return (
    <Container className="container-metrics-explorer">
      <Row>
        <Col>
          <AutoSizer disableHeight>
            {({ width }) => (
              <Table
                ref={tableRef}
                rowClassName="table-row"
                headerClassName="header-list-metrics"
                gridClassName="grid-list-metrics"
                headerHeight={32}
                width={width}
                height={690}
                rowHeight={_getRowHeight}
                rowGetter={({ index }) => metricsListFiltered[index]}
                rowRenderer={_rowRenderer}
                noRowsRenderer={_noRowsRenderer}
                rowCount={metricsListFiltered?.length}
                onRowClick={_onRowClick}
                sort={() => dispatch(sortMetricsAscDesc())}
                sortBy={sortBy}
                sortDirection={sortDirection}
              >
                <Column label="Date" dataKey="time" width={width * 0.3} />
                <Column
                  label="Load avg (%)"
                  dataKey={loadAvgFilter}
                  width={width * 0.25}
                  cellRenderer={_cellRenderer}
                />
                <Column label="File" dataKey="files" width={width * 0.2} />
                <Column label="Inode" dataKey="inodes" width={width * 0.2} />
              </Table>
            )}
          </AutoSizer>
        </Col>
      </Row>
    </Container>
  );
}
