const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subjectSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    projects:{
        type:[Schema.Types.ObjectId],
        default: null
    }
});

module.exports = mongoose.model("Subjects", subjectSchema);