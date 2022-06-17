import React, { useState } from "react";
import "./ToggleButton.css";

const ToggleButton = ({ parentCallback }) => {
    const [chosenType, setChosenType] = useState('single');

    const setSingleDate = () => {
        parentCallback('single');
    };

    const setRangeDates = () => {
        parentCallback('rangeOfDates');
    }

    return (
        <div className="main-toggle">
            <button className="toggle-button" onClick={setSingleDate}>
                <span></span>
                <h3>Single Date</h3>
            </button>
            <button className="toggle-button" onClick={setRangeDates}>
                <span></span>
                <h3>Range of Dates</h3>
            </button>
        </div>
    );
}

export default ToggleButton;

