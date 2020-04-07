import _ from "lodash";
import moment from "moment";

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
import metricsJson from "../../assets/metrics.json";
import formatMetricsList from "../../helpers.js/formatMetricsList";
import formatListSelectAndSort from "../../helpers.js/formatListSelectAndSort";
import formatDataCpuUsage from "../../helpers.js/formatDataCpuUsage";
import formatDataMemoryUsed from "../../helpers.js/formatDataMemoryUsed";
import formatDataNetworkTransfer from "../../helpers.js/formatDataNetworkTransfer";
import formatDataDiskUtilization from "../../helpers.js/formatDataDiskUtilization";
import formatDataCpuChart from "../../helpers.js/formatDataCpuChart";

// Constants
const ASC = "ASC";
const DESC = "DESC";

const initialState = {
  metricsList: formatMetricsList(metricsJson),
  metricsListFiltered: formatMetricsList(metricsJson),
  loadAvgFilter: "fiveMin",
  avgLoadAvg: 0,
  sortBy: "time",
  filesList: [],
  inodesList: [],
  dataCpuChart: [],
  sortDirection: DESC,
  idItemsSelect: -1,
  idIRowSelect: -1,
  infosCpuUsage: [],
  infosMemoryUsed: [],
  infosNetworkTransfer: [],
  infosDiskUtilization: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_METRICS_LIST:
      return {
        ...state,
        metricsListFiltered: state.metricsList,
      };
    case GET_FILES_LIST:
      return {
        ...state,
        filesList: formatListSelectAndSort(state.metricsList, "files"),
      };
    case GET_INODES_LIST:
      return {
        ...state,
        inodesList: formatListSelectAndSort(state.metricsList, "inodes"),
      };
    case GET_DATA_CPU_CHART: {
      return {
        ...state,
        dataCpuChart: formatDataCpuChart(
          state.metricsList,
          state.idItemsSelect,
          state.infosCpuUsage
        ),
      };
    }
    case SELECT_LOAD_AVG:
      return {
        ...state,
        loadAvgFilter: action.loadAvgFilter,
      };
    case GET_AVG_LOAD_AVG: {
      let totalLoadAvg = 0;
      let avg = 0;
      state.metricsListFiltered.map((e) => {
        totalLoadAvg += e[action.loadAvgFilter];
        return totalLoadAvg;
      });
      avg =
        Math.round((totalLoadAvg / state.metricsListFiltered.length) * 100) /
        100;
      return {
        ...state,
        avgLoadAvg: avg,
      };
    }
    case SELECT_ROW_METRICS:
      return {
        ...state,
        idItemsSelect: action.idItemsSelect,
        idRowSelect: action.idRowSelect,
      };
    case SORT_METRICS_ASC_DESC: {
      const sortedList = _.sortBy(state.metricsListFiltered, [state.sortBy]);
      if (state.sortDirection === DESC) {
        sortedList.reverse();
      }
      return {
        ...state,
        metricsListFiltered: sortedList,
        sortDirection: state.sortDirection === ASC ? DESC : ASC,
      };
    }
    case FILTER_METRICS_BY_PARAM: {
      let metricsListFilteredByParam = [];
      switch (action.typeParam) {
        case "files":
          metricsListFilteredByParam = state.metricsList.filter(
            (e) => e.files === action.paramFilter
          );
          break;
        case "inodes":
          metricsListFilteredByParam = state.metricsList.filter(
            (e) => e.inodes === action.paramFilter
          );
          break;
        case "date":
          metricsListFilteredByParam = state.metricsList.filter((e) => {
            const date = moment(e.time, "DD-MM-YYYY h:mm:ss").format(
              "DD-MM-YYYY h:mm:ss"
            );
            return (
              date > action.paramFilter.startDate &&
              date < action.paramFilter.endDate
            );
          });
          break;
        default:
          break;
      }
      return {
        ...state,
        metricsListFiltered: metricsListFilteredByParam.length
          ? metricsListFilteredByParam
          : state.metricsList,
      };
    }
    case GET_INFOS_CPU_USAGE: {
      return {
        ...state,
        infosCpuUsage: formatDataCpuUsage(state.metricsListFiltered),
      };
    }
    case GET_INFOS_MEMORY_USED: {
      return {
        ...state,
        infosMemoryUsed: formatDataMemoryUsed(
          state.metricsListFiltered,
          state.idItemsSelect
        ),
      };
    }
    case GET_INFOS_NETWORK_TRANSFER: {
      return {
        ...state,
        infosNetworkTransfer: formatDataNetworkTransfer(
          state.metricsListFiltered,
          state.idItemsSelect
        ),
      };
    }
    case GET_INFOS_DISK_UTILIZATION: {
      return {
        ...state,
        infosDiskUtilization: formatDataDiskUtilization(
          state.metricsListFiltered,
          state.idItemsSelect
        ),
      };
    }
    default:
      return state;
  }
};
