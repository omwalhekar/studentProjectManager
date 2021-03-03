const express = require('express');
const { findById } = require('../../models/Members');
const router = express.Router();

const Members = require("../../models/Members");

//GET
//Get array of members using id
router.get("/:id", async (req, res) => {
    try {
        const members = await Members.findById(req.params.id);
        res.json(members);

    } catch (error) {
        console.error(error.message);
        res.status(500).json({msg:error.message});
    }
});


//POST
//Adding members
//admin route
router.post("/", async (req, res) => {
    try {
        const memberArray = req.body;             
        const newMembers = new Members({members:memberArray});
        const members = await newMembers.save();

        res.json(members);

    } catch (error) {
        console.error(error.message);
        res.status(500).json({msg:error.message});
    }
});


module.exports = router ;