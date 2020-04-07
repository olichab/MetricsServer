import {
  GET_METRICS_LIST,
  GET_FILES_LIST,
  GET_INODES_LIST,
  GET_DATA_CPU_CHART,
  SELECT_LOAD_AVG,
  GET_AVG_LOAD_AVG,
  SELECT_ROW_METRICS,
  SORT_METRICS_ASC_DESC,
  FILTER_METRICS_BY_PARAM,
  GET_INFOS_CPU_USAGE,
  GET_INFOS_MEMORY_USED,
  GET_INFOS_NETWORK_TRANSFER,
  GET_INFOS_DISK_UTILIZATION,
} from "./actionTypes";

export const getMetricsList = () => {
  return { type: GET_METRICS_LIST };
};

export const getFilesList = () => {
  return { type: GET_FILES_LIST };
};

export const getInodesList = () => {
  return { type: GET_INODES_LIST };
};

export const getDataCpuChart = () => {
  return { type: GET_DATA_CPU_CHART };
};

export const selectLoadAvg = (loadAvgFilter) => {
  return { type: SELECT_LOAD_AVG, loadAvgFilter };
};

export const getAvgLoadAvg = (loadAvgFilter) => {
  return { type: GET_AVG_LOAD_AVG, loadAvgFilter };
};

export const selectRowMetrics = (idItemsSelect, idRowSelect) => {
  return { type: SELECT_ROW_METRICS, idItemsSelect, idRowSelect };
};

export const sortMetricsAscDesc = () => {
  return { type: SORT_METRICS_ASC_DESC };
};

export const filterMetricsByParam = (paramFilter, typeParam) => {
  return {
    type: FILTER_METRICS_BY_PARAM,
    paramFilter,
    typeParam,
  };
};

export const getInfosCpuUsage = () => {
  return { type: GET_INFOS_CPU_USAGE };
};

export const getInfosMemoryUsed = () => {
  return { type: GET_INFOS_MEMORY_USED };
};

export const getInfosNetworkTransfer = () => {
  return { type: GET_INFOS_NETWORK_TRANSFER };
};

export const getInfosDiskUtilization = () => {
  return { type: GET_INFOS_DISK_UTILIZATION };
};
