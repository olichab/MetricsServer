import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Media, Popover } from "reactstrap";
import moment from "moment";
import InfiniteCalendar, { Calendar, withRange } from "react-infinite-calendar";
import {
  filterMetricsByParam,
  getInfosMemoryUsed,
  getInfosNetworkTransfer,
  getInfosDiskUtilization,
} from "../store/metrics/metricsAction";
import "react-infinite-calendar/styles.css";
import "../scss/Calendar.scss";
import calendarIcon from "../assets/images/icons/calendar.svg";

const CalendarWithRange = withRange(Calendar);
const theme = {
  selectionColor: "#043c7c",
  textColor: {
    default: "#585858",
    active: "#FFF",
  },
  weekdayColor: "#043c7c",
  headerColor: "#097aee",
  todayColor: "#097aee",
  floatingNav: {
    background: "#097aee",
    color: "#FFF",
    chevron: "transparent",
  },
};

export default function CalendarRange() {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const toggle = () => setPopoverOpen(!popoverOpen);
  const dispatch = useDispatch();
  const _onSelectDate = (date) => {
    if (date.eventType === 3) {
      setPopoverOpen(false);
      dispatch(
        filterMetricsByParam(
          {
            startDate: moment(date.start).format("DD[-]MM[-]YYYY HH:mm:ss"),
            endDate: moment(date.end)
              .add("days", 1)
              .format("DD[-]MM[-]YYYY HH:mm:ss"),
          },
          "date"
        )
      );
      dispatch(getInfosMemoryUsed());
      dispatch(getInfosNetworkTransfer());
      dispatch(getInfosDiskUtilization());
    }
  };

  return (
    <>
      <Media
        object
        src={calendarIcon}
        alt="calendar icon"
        className="calendar-icon"
        id="popoverCalendar"
        type="button"
      />
      <Popover
        className="popover-calendar"
        placement="auto-end"
        isOpen={popoverOpen}
        target="popoverCalendar"
        toggle={toggle}
      >
        <InfiniteCalendar
          width={360}
          height={400}
          Component={CalendarWithRange}
          selected={{
            start: new Date(2020, 2, 16),
            end: new Date(2020, 2, 19),
          }}
          onSelect={(date) => _onSelectDate(date)}
          minDate={new Date(2020, 2, 16)}
          maxDate={new Date(2020, 2, 19)}
          theme={theme}
          locale={{
            locale: require("date-fns/locale/fr"),
            headerFormat: "dddd, D MMM",
            weekdays: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
            blank: "Aucune date selectionnee",
            todayLabel: {
              long: "Aujourd'hui",
              short: "Auj.",
            },
          }}
        />
      </Popover>
    </>
  );
}
