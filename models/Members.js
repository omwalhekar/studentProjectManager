const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MemberSchema = new Schema({
    members:[{
        name:{
            type: String,
            required: true
        },
        year:{
            type: String,
            required: true
        },
        rollNo:{
            type: String,
            required: true
        },
        dept:{
            type: String,
            required: true
        },
        erp: {
            type: String,
            required: true,
            unique: true
        }

    }],
})

module.exports = mongoose.model("Members", MemberSchema);