const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cardSchema = new Schema({
    category: {
        type: String
    },
    videoID: {
        type: String
    }
});

const Cards = mongoose.model('Card', cardSchema);

module.exports = Cards;