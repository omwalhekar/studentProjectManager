const express = require('express');
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null,'./client/public/uploads')
    },
    filename: function(req, file, cb){
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
})
const upload = multer({storage: storage});


const Project = require("../../models/Project");
const Members = require("../../models/Members");
const Subjects = require("../../models/Subjects");


//GET 
//Get all projects
//Public
router.get("/", async (req, res)=>{
try {
   const projects = await Project.find().sort({ date: -1 });
   if(!projects){
        return res.status(404).json({msg: "No projects found."})
   }
   res.send(projects);
}catch (error) {
    console.error(error.message);
    res.status(500).json({msg:error.message});
}
});

//GET ALL PROJECTS IN DEPT
router.get("/:dept", async (req, res)=>{
    try {
       const projects = await Project.find({dept: req.params.dept}).sort({ date: -1 });
       if(!projects){
            return res.status(404).json({msg: "No projects found."})
       }
       res.send(projects);
    }catch (error) {
        console.error(error.message);
        res.status(500).json({msg:error.message});
    }
    });

//GET ALL PROJECTS OF A SUBJECT IN DEPT
router.get("/:dept/:sub", async (req, res)=>{
    try {
       const projects = await Project.find({dept: req.params.dept,subject:req.params.sub}).sort({ date: -1 });
       if(!projects){
            return res.status(404).json({msg: "No projects found."})
       }
       res.send(projects);
    }catch (error) {
        console.error(error.message);
        res.status(500).json({msg:error.message});
    }
    });

//GET FILTERED PROJECTS
router.get("/:year/:dept/:sem/:sub", async (req, res)=>{
    
    const {year, dept, sem, sub} = req.params;
    try {
       const projects = await Project.find({dept: dept, subject:sub, sem: sem, year: year}).sort({ date: -1 });
       if(!projects){
            return res.status(404).json({msg: "No projects found."})
       }
       res.send(projects);
    }catch (error) {
        console.error(error.message);
        res.status(500).json({msg:error.message});
    }
});


//GET
//Get a single Project
//Public
router.get("/:id",getProject, async (req, res)=>{
    try {
       res.send(res.project);
    }catch (error) {
        console.error(error.message);
        res.status(500).json({msg:error.message});
    }
});

//POST
//Add a Project
//Admin Authorized
router.post("/", upload.array("images",4), async (req, res) => {
    console.log(req.files);
    try {
        const {
            projTitle,
            projDescription,
            projDomain,
            dept,
            year,
            sem,
            subject,
            projRepo,
            projLink,
            members,
            images,
            date
        } = req.body;
        const proj = await Project.findOne({projTitle:projTitle})
        if(!proj)
        {
            const newProject = new Project({
            projTitle,
            projDescription,
            projDomain,
            dept,
            subject,
            year,
            sem,
            projRepo,
            projLink,
            members,
            images,
            date
        });
            const project = await newProject.save();
            return res.json(project);
        }
        res.json({msg:"Project Already Exists"});

    } catch (error) {
        console.error(error.message);
        res.status(500).json({msg:error.message});
    }
});

//DELETE route
//To delete a project
//Private Route
router.delete("/:id", getProject, async (req, res) => {
    try {
        // let memberID = res.project.members;
        await res.project.remove();
        // await Members.findByIdAndDelete(memberID);
        res.json(await Project.find())
    } catch (error) {
        res.status(500).json({msg:error.message});
    }
})


//SEE IF THERES IS ANY EXISTING PROJECT 
async function getProject(req, res, next){
    let project
    try {
        project = await Project.findById(req.params.id);
        if(project == null){
            return res.status(404).json({msg: "Project not Found!"})
        }
    } catch (error) {
        return res.status(500).json({msg:error.message});
    }

    res.project = project;
    next();

}

module.exports = router ;