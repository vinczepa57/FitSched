const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const entrySchema = new Schema({

    day: {
        type: String
    },
    categoryName: {
        type: String
    },
    videoID: {
        type: String
    }
});

const Entry = mongoose.model('Entry', entrySchema);

module.exports = Entry;