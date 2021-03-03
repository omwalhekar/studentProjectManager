const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const deptSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    subjects:{
        type:[Schema.Types.ObjectId],
        default: []
    }
});


module.exports = mongoose.model("Dept", deptSchema);