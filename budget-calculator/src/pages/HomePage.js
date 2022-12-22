import React, { useState } from "react";
import { Link } from "react-router-dom";
import months from "../data/months";
import ReactCalendar from "../components/ReactCalendar";
import Calendar from 'react-calendar';

const HomePage = () => {
    
    return (
        <div className="body">
            <h1>Choose a year and a month to view Om's expenses.</h1>
            <div className="calendar">
                <ReactCalendar />
            </div>
        </div>
    )
}

export default HomePage;