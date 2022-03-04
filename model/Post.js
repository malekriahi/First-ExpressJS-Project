const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({

    titre : {
        type : String,
        required : true
    },
    text : {
        type : String,
        required : true
    },
    createdAt: {
        type: Date, 
        default: Date.now
    }
});

module.exports = mongoose.model('Post',postSchema);