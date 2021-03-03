import axios from 'axios';
import {GET_PROJECT,
     GET_PROJECTS,
     GET_DEPT_PROJS,
      GET_SUB_PROJS,
       DELETE_PROJ,
        FILTER_PROJ,
         CLEAR_FILTER} from "./types";

export const searchProjects = ({projYear,
    projDept,
    projSem,
    projSub}) => async dispatch => {
    try {
        const res = await axios.get(`/projects/${projYear}/${projDept}/${projSem}/${projSub}`);
        if(res.data === [])
        {
            dispatch(
                {
                    type: CLEAR_FILTER,
                    payload: null
                })           
        }
        else{
            dispatch({
                type: FILTER_PROJ,
                payload: res.data
            })
        }
        
    } catch (error) {
        console.log("SERVER ERRORRRRRRRRRR");
    }
}

export const filterProject = (keyword) => async dispatch => {
    try {
        const res = await axios.get("/projects");
        const projects = res.data;
        console.log(keyword);
        if(keyword)
        {
            const filteredProjects = projects.filter((project) => {
                const regex = new RegExp(`${keyword}`, 'gi');
                return project.dept.match(regex) || 
                project.year.match(regex) || 
                project.projTitle.match(regex) || 
                project.subject.match(regex) ||
                project.projDomain.match(regex);
            })
            dispatch({
                type: FILTER_PROJ,
                payload: filteredProjects
            })
        }
        else{
            dispatch({
                type: FILTER_PROJ,
                payload: null
            })
        }
        
    } catch (error) {
        console.log("SERVER ERRORRRRRRRRRR");
    }
}

export const clearFilter = () => dispatch => {
    try {
        
            dispatch({
                type: CLEAR_FILTER,
                payload: null
            })
        
    } catch (error) {
        console.log("SERVER ERRORRRRRRRRRR");
    }
}

export const addProject = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
              'Content-Type': 'application/json'
            }
          };
        const res = await axios.post("/projects", formData, config);
        
        var newSub = {
            name: formData.subject,
            projectID : res.data._id
        }
        // console.log(res.data._id);
        const sub = await axios.post("/subjects", newSub, config);

        var newDept = {
            name : formData.dept,
            subjectID : sub.data._id
        }
        
        const dept = await axios.post("/Dept", newDept, config);
        
        
        dispatch({
            type: GET_PROJECT,
            payload: res.data
        });

        history.push('/projectspage#projects');
    } catch (error) {
        console.log("SERVER ERRORRRRRRRRRR");
    }
}

export const getAllProjects = () => async dispatch => {
    try {
        const res = await axios.get("/projects");
        dispatch({
            type: GET_PROJECTS,
            payload: res.data
        })
    } catch (error) {
        console.log("SERVER ERRORRRRRRRRRR");
    }
}
export const getDeptProjs = (dept) => async dispatch => {
    try {
        const res = await axios.get(`/projects/${dept}`);
        dispatch({
            type: GET_DEPT_PROJS,
            payload: res.data
        })
    } catch (error) {
        console.log("SERVER ERRORRRRRRRRRR");
    }
}

export const getSubProjs = (dept,sub) => async dispatch => {
    try {
        const res = await axios.get(`/projects/${dept}/${sub}`);
        dispatch({
            type: GET_SUB_PROJS,
            payload: res.data
        })
    } catch (error) {
        console.log("SERVER ERRORRRRRRRRRR");
    }
}

export const deleteProj = (id) => async dispatch => {
    try {
        const res = await axios.delete(`/projects/${id}`);
        dispatch({
            type: DELETE_PROJ,
            payload: res.data
        })
    } catch (error) {
        console.log("SERVER ERRORRRRRRRRRR");
    }
}