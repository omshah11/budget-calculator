import React, { useState } from "react";
import { Link } from "react-router-dom";
import months from "../data/months";
import { render } from "react-dom";
import Calendar from "react-calendar";

const ReactCalendar = () => {
  const [date, setDate] = useState(new Date());

  const onChange = date => {
    setDate(date);
  };

  return (
    <div>
      <Calendar onChange={onChange} value={date} />
      <Link to={`/${(date.getMonth()+1).toString()}`}>
      {console.log(date.getMonth() + 1)}
      <p>Check this month's expenses</p>
      </Link>
    </div>
  );
};

export default ReactCalendar;