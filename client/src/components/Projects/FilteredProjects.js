import React, {useEffect, useState} from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {searchProjects} from "../../actions/project"
import {getAllSubs} from "../../actions/subject";
import {getDepts} from "../../actions/dept";
import ProjectList from "./ProjectList";

const FilteredProjects = ({getDepts,getAllSubs,searchProjects, project, subject, dept}) => {
    useEffect(() => {
        getDepts();
        getAllSubs();
      }, [getDepts,getAllSubs ]);

    const [filterData, setFilterData] = useState({
        projYear: '2022',
        projDept: '',
        projSem: 1,
        projSub: '' 
    });

    const {
        projYear,
        projDept,
        projSem,
        projSub
    } = filterData;

    const onChange = e =>
	setFilterData({ ...filterData, [e.target.name]: e.target.value });

	
      
    return (
        <div className="filtered_projects">
            <div className="filters">
                <label htmlFor="project-year">Year :</label>
                <input type="number" id="project-year" name="projYear" value={projYear}  onChange={onChange} min="2022" placeholder="Enter batch year" required />

				<label htmlFor="project-dept">Department :</label>
                <select id="project-dept" name="projDept" value={projDept} onChange={onChange} >
                    <option>Select Department</option>
                    {dept.depts ? (
                        dept.depts.map((dept)=>{
                            return <option>{dept.name}</option>
                        })
                    ) : null }
                </select>
                
                <label htmlFor="project-sem">Semester :</label>
                <input type="number" id="project-sem" name="projSem" value={projSem} onChange={onChange} min="1" max="8" placeholder="Enter semester" required />

                <label htmlFor="project-sub">Subject :</label>
                <select id="project-sub" name="projSub" value={projSub} onChange={onChange}>
                <option>Select Subject</option>
                    {subject.subs ? (
                        subject.subs.map((sub)=>{
                            return <option >{sub.name}</option>
                        })
                    ) : null }
                </select>

                <button onClick={()=>{
                    console.log(filterData)
                    searchProjects(filterData);
                }} className="search-btn center-btn"><i className="fas fa-search"></i></button>
            </div>
             
         
            <ProjectList projects={project.filtered} id="projects"/>
        </div>
        
)
}

FilteredProjects.propTypes = {
    project: PropTypes.object.isRequired,
    dept: PropTypes.object.isRequired,
    subject: PropTypes.object.isRequired,
    getDepts: PropTypes.func.isRequired,
    getAllSubs: PropTypes.func.isRequired,
    searchProjects: PropTypes.func.isRequired,
  };
  
  const mapStateToProps = (state) => ({
    project: state.project,
    subject: state.subject,
    dept: state.dept
  });
  
  export default connect(mapStateToProps, {getDepts,getAllSubs,searchProjects})(FilteredProjects);
  