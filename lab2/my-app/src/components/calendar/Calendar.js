import React, { useState } from "react";
import PropTypes from 'prop-types';
import {subMonths, addMonths, format, startOfWeek, endOfWeek, addDays, startOfMonth, endOfMonth, isAfter, isBefore, isSameMonth, isSameDay} from 'date-fns';
import "./Calendar.css";


const Calendar = ({type}) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [ranges, setRanges] = useState([]);
    const [formRanges, setFormRanges] = useState([]);
    const [contentCells, setContentCells] = useState([]);

    const nextMonth = () => {
        setCurrentDate(addMonths(currentDate, 1));
    };
    const prevMonth = () => {
        setCurrentDate(subMonths(currentDate, 1));
    };

    //single
    const onDateClick = (day) => {
        setSelectedDate(day);
        setEndDate(null);
        setStartDate(null);
    }

    //range
    const onRangeClick = (day) => {
        if(startDate === null || endDate !== null) {
            setStartDate(day);
            setEndDate(null);
        }
        else {
            setEndDate(day);
        }
    }

    const GenerateRange = () => {
        if(startDate === null || endDate === null) {
            return;
        }
        const dayFormat = "PPP"
        return (
            <div className="selectedData">
                <label>{format(startDate, dayFormat)}</label>
                <span>&#10141;</span>
                <label>{format(endDate, dayFormat)}</label>
            </div>
        )
    }

    const header = () => {
        const dateFormat = "MMMM yyyy";

        const centeredStyle = {
            textAlign: 'center',
        };

        const endStyle = {
            textAlign: 'end',
        };
        
        return (
            <div className="header row flex-middle">
                <div className="column col-start">
                    <div className="icon" onClick={prevMonth}>
                        chevron_left
                    </div>
                </div>
                <div className="column col-center" style={centeredStyle}>
                    <span>{format(currentDate, dateFormat)}</span>
                </div>
                <div className="column col-end" style={endStyle}>
                    <div className="icon" onClick={nextMonth}>
                        chevron_right
                    </div>
                </div>
            </div>
        );
    };

    const days = () => {
        const dateFormat = "eee";
        const days = [];
        let startDate = startOfWeek(currentDate);

        for (let i = 0; i < 7; i++) {
            days.push(
                <div className="column col-center" key={i}>
                    <span>&nbsp;&nbsp;&nbsp;</span>
                    {format(addDays(startDate, i), dateFormat)}
                </div>
            );
        }
        return <div className="days row">{days}</div>;
    };
    
    const cells = () => {
        contentCells.length = 0;
        const monthStart = startOfMonth(currentDate);
        const monthEnd = endOfMonth(monthStart);
        const currStartDate = startOfWeek(monthStart);
        const currEndDate = endOfWeek(monthEnd);
        const dateFormat = "d";
        const rows = [];
        let days = [];
        let day = currStartDate;
        let formattedDate = "";

        

        while (day <= currEndDate) {
            for (let i = 0; i < 7; i++) {
                console.log((startDate && endDate && ((isAfter(day, startDate) && isBefore(day, endDate)) || isSameDay(day, startDate)) || isSameDay(day, endDate)));
                formattedDate = format(day, dateFormat);
                const cloneDay = day;
                days.push(
                    <div 
                        className={`column cell ${(startDate && endDate && ((isAfter(day, startDate) && isBefore(day, endDate)) || isSameDay(day, startDate)) || isSameDay(day, endDate))
                            ? "selectedRange": !isSameMonth(day, monthStart)
                            ? "disabled" :  isSameDay(day, selectedDate)
                            ? "selected" : "" }`}
                        key={day} 
                        onClick={() => {type === 'single' ? onDateClick(cloneDay) : onRangeClick(cloneDay)}}
                    > 
                        <span className="number">{formattedDate}</span>
                        <span className="bg">{formattedDate}</span>
                    </div>
                    );
                day = addDays(day, 1);
            }
            contentCells.push(
                <div className="row" key={day}> {days} </div>
                );
            days = [];
        }
        //setContentCells(rows);
        return <div className="body">{contentCells}</div>;
    }

    const setChosenDate = () => {
        const dayFormat = "PPP"
        return (
            <div className="selectedData">
                <label>{format(selectedDate, dayFormat)}</label>
            </div>
        );
    }

    return (
        <div className="calendar">
            <div>{header()}</div>
            <div>{days()}</div>
            <div>{cells()}</div>
            <div>{type === 'single' ? setChosenDate() : GenerateRange()}</div>
        </div>
    );
};
export default Calendar;