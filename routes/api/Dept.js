const express = require("express");
const router = express.Router();

const Dept = require("../../models/Dept");

//GET 
//Get all departments
router.get("/", async (req, res) => {
    try {
        const depts = await Dept.find();
        if(!depts){
            return res.status(404).json({msg: "No Dept Found"})
        }
        res.json(depts);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({msg:error.message});
    }
});


//Update / POST
//Update a department
router.post("/", async (req, res) => {
    try {
        const {name, subjectID} = req.body;
        let dept = await Dept.findOne({name : name});
        if(dept){
            // console.log(subjectID);
            if(!dept.subjects.includes(subjectID))
            {
                var subjects = dept.subjects;
                subjects.push(subjectID);
                // console.log(subjects);
            }                 
            else
                var subjects = dept.subjects;
            
            const update = {name, subjects };
            const filter = {_id: dept.id};
            dept = await Dept.findOneAndUpdate(filter, update, {
            new: true
            });
            return res.json(dept);
        }
        else{
            var subjects = [subjectID];
        }
        const newDept = new Dept({
            name,
            subjects
        });
        let dept1 = await newDept.save();
        res.json(dept1);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({msg:error.message});
    }
})

//DELETE
//Delete a department
//admin
router.delete("/:id",getDept, async (req, res)=>{
    try {
        if(res.dept){
            await Dept.findByIdAndDelete(req.params.id);
            res.json({msg: "Dept deleted"})
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({msg:error.message});
    }
})

//SEE IF THERES IS ANY EXISTING DEPT 
async function getDept(req, res, next){
    let dept
    try {
        dept = await Dept.findById(req.params.id);
        if(dept == null){
            return res.status(404).json({msg: "Dept not Found!"})
        }
    } catch (error) {
        return res.status(500).json({msg:error.message});
    }

    res.dept = dept;
    next();

}
module.exports = router;