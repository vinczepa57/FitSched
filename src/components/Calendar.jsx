import React from "react";
import CalendarDay from "./CalendarDay";

const days = ["Mo","Di","Mi","Do","Fr","Sa","So"];

function Calendar(){

    return (
        <div className="calendar">
            {days.map( newDay =>
                <CalendarDay 
                    key={newDay} 
                    day={newDay} 
                />
                )}
        </div>
    );
}

export default Calendar;
export {days};