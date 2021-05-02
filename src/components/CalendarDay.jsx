import React, { useState, useEffect } from "react";
import axios from "axios";
import Entry from "./Entry";

function CalendarDay(props) {

    const [entry, setEntry] = useState({
        id: '',
        day: '',
        categoryName: '',
        videoID: '',
        entries: []
    });

    useEffect(() => {
        axios.get('http://localhost:4000/entries/')
        .then(response => {
            setEntry({
                id: response.data._id,
                day: response.data.day,
                categoryName: response.data.category,
                videoID: response.data.videoID,
                entries: response.data.map(entry => {
                    return (
                        {
                            'id': entry._id,
                            'day': entry.day,
                            'categoryName': entry.categoryName,
                            'videoID': entry.videoID
                        }
                    )})
            });
        });
    });

    function deleteEntry(id){

        axios.delete('http://localhost:4000/entries/'+id)
            .then(res => console.log(res.data));
        
        setEntry({
            entries: entry.entries.filter( entryItem => entryItem._id !== id)
        });
    }

    return (
        <div className="calendarDay">
                <p>{props.day}</p>
                {
                    entry.entries.map( newEntry => { 
                        if(newEntry.day === props.day)
                        {
                            return (
                                    <Entry 
                                        id={newEntry.id}
                                        key={newEntry.id}
                                        videoID={newEntry.videoID}
                                        categoryName={newEntry.categoryName}
                                        deleteEntry={deleteEntry}
                                    />
                                )
                        } else{
                            return null;
                        }
                    })
                }
        </div>
    )
}

export default CalendarDay;