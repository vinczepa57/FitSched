import React, { useState } from "react";
import axios from "axios";
import {days} from "./Calendar";

function Card(props){

    const [showSelection,setShowSelection] = useState(false);
    const selectDays = ["",...days];

    function handleDeleteClick(){
        props.onDelete(props.id);
    }

    function handleAddClick(){
        setShowSelection(true);
    }

    function handleSelect(event){
        setShowSelection(false);

        const entry = {
            day: event.target.value,
            categoryName: props.category,
            videoID: props.videoID
        };

        axios.post('http://localhost:4000/entries/add', entry)
            .then(res => console.log(res.data));
    }

    return (
        <div className="Card">
            <iframe className="videoFrame" title={props.videoID} src={"https://www.youtube.com/embed/" + props.videoID} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen={true}></iframe>
            <button className="cardButtons" onClick={handleAddClick} style={{marginTop: 30 + "px"}}><i className="far fa-check-circle fa-2x"></i></button>
            <button className="cardButtons" onClick={handleDeleteClick} style={{marginTop: 110 + "px"}}><i className="fas fa-trash-alt fa-2x"></i></button>
            {   
                showSelection && <select className="cardSelection" onChange={handleSelect} id="days">
                    {
                        selectDays.map(day => {
                            return (
                                <option key={day} value={day}>{day}</option>
                            )
                        })
                    }
                </select>
            }
        </div>
    );
}

export default Card;