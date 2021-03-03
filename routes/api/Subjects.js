const express = require("express");
const router = express.Router();

const Subjects = require("../../models/Subjects");
const Dept = require("../../models/Dept");

//GET 
//Get all subjects
router.get("/", async (req, res) => {
    try {
        const subs = await Subjects.find();
        if(!subs){
            return res.status(404).json({msg: "No Subjects Found"})
        }
        res.json(subs);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({msg:error.message});
    }
});

//Post 
//Add a Subject
router.post("/",getSub, async (req, res) => {
    try {
        const {name, projectID} = req.body;
        if(res.sub){
            var projects = res.sub.projects;
            projects.push(projectID);
            const update = {name, projects };
            const filter = {_id: res.sub._id};
            let sub = await Subjects.findOneAndUpdate(filter, update, {
            new: true
            });
            return res.json(sub);
        }else{
            var projects = [projectID];
        }
        
        const newSub = new Subjects({
            name,
            projects
        });
        const sub = await newSub.save();
        res.json(sub);

    } catch (error) {
        console.error(error.message);
        res.status(500).json({msg:error.message});
    }
})

//DELETE
//Delete a Subject
//admin
router.delete("/:id", async (req, res)=>{
    try {
           let sub =  await Subjects.findById(req.params.id);
           if(!sub){               
               return res.json({msg:"Subject not found!"})
           }
            await Subjects.findByIdAndRemove(req.params.id);
            res.json({msg: "Subject deleted"})
        
    } catch (error) {
        console.error(error.message);
        res.status(500).json({msg:error.message});
    }
})

//GET SUBJECT USING DEPARTMENT NAME
router.get("/:name", async (req, res) => {
    var subjects = []
    var subNames = []
    try {
        const dept = await Dept.find({name: req.params.name});
        console.log(dept);
        if(!dept){
            return res.status(404).json({msg: "No Subjects Found"})
        }
        
        let subs = dept[0].subjects;
        for(var i = 0 ; i < subs.length ; i++ )
        {   
            subjects.push((await Subjects.findById(subs[i])))
        }
        for(var i = 0 ; i < subs.length ; i++ )
        {   
            subNames.push((subjects[i].name))
        }

        res.json(subNames);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({msg:error.message});
    }
});

//SEE IF THERES IS ANY EXISTING SUBJECT
async function getSub(req, res, next){
    let sub
    try {
        sub = await Subjects.findOne({name : req.body.name});
    } catch (error) {
        return res.status(500).json({msg:error.message});
    }

    res.sub = sub;
    next();

}
module.exports = router;