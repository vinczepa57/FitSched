import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";
import Slider from "react-slick";

function TrainingSection(props){
    
    const [showForm, setShowForm] = useState(false);
    const [videoID, setVideoID] = useState("");
    const [card, setCard] = useState({
        id: "",
        category: "",
        videoID: "",
        cards: []
    });

    const settings = {
        className: "thisIsTheNewCSSClass",
        slidesToShow: getSlides(),
        slidesToScroll: 1,
      };

    useEffect(() => {
        axios.get('http://localhost:4000/cards/')
        .then(response => {
            setCard({
                id: response.data._id,
                category: response.data.category,
                videoID: response.data.videoID,
                cards: response.data.map(card => {
                    return (
                        {
                            'id': card._id,
                            'category': card.category,
                            'videoID': card.videoID
                        }
                    )})
            });
        });
    });
    
    function getSlides() {

        let cardCount = 0;
        let screenWidth = window.innerWidth;

        card.cards.map(newCard => {
            if(newCard.category === props.name)
            {
                cardCount++;
            }
        });

        if(cardCount >= 3 && screenWidth >= 1200) return 3;
        if(screenWidth >= 850 && screenWidth < 1200) return 2;
        else return 1;
    }

    function handleClick(){
        setShowForm(true);
    }

    function handleChange(event){
        const vID = event.target.value;
        setVideoID(vID);
        event.preventDefault();
    }

    function addCard(){
        setShowForm(false);
    
        const card = {
            category: props.name,
            videoID: videoID
        };

        axios.post('http://localhost:4000/cards/add', card)
            .then(res => console.log(res.data));
    }

    function deleteCard(id)
    {
        axios.delete('http://localhost:4000/cards/'+id)
            .then(res => console.log(res.data));

        setCard({
            cards: card.cards.filter( cardItem => cardItem._id !== id)
        });
    }

    return (
        <div className="TrainingSection">
            <h2>
                {props.name}
                <button className="addButton" title="Add Card" onClick={handleClick}><i className="fas fa-plus iconWhite"></i></button>
            </h2>
            {   showForm &&
                <p id="addVideo">
                    Insert Youtube-videoID &nbsp;&nbsp;&nbsp; 
                    <input onChange={handleChange} value={videoID}></input>
                    <button className="addButton" onClick={addCard}><div className="addCard">Add Card</div></button>
                </p>
            }
            <Slider {...settings}>
            {   
                card.cards.map(newCard => {
                    if(newCard.category === props.name)
                    {
                        return (
                        <div key={newCard.id}>
                        <Card 
                            id={newCard.id}
                            category={props.name}
                            videoID={newCard.videoID}
                            onDelete={deleteCard}
                        />
                        </div>
                        );
                    } else{
                         return null;
                      }
            })}
            </Slider>
        </div>
    );
}

export default TrainingSection;