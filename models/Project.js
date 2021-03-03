const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    projTitle:{
        type: String,
        required: true,
        unique: true
    },
    projDescription:{
        type: String,
        required: true
    },
    projDomain:{
        type: String,
        required: true
    },
    dept:{
        type: String,
        required: true
    },
    year:{
        type: String,
        required: true
    },
    sem:{
        type: Number,
        required: true
    },
    subject:{
        type: String,
        required: true
    },
    projRepo:{
        type: String
    },
    projLink:{
        type: String
    },
    members:[],
    images:[String],
    date:{
        type: Date,
        default: Date.now,
    }

})
module.exports = mongoose.model("Project", ProjectSchema);