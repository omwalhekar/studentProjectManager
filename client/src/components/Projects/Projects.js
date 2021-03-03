import React, {useEffect, Fragment} from "react";
import PropTypes from 'prop-types';
import {connect } from "react-redux";
import ProjectList from "./ProjectList";
import Category from "./Category";
import {getAllProjects} from "../../actions/project";
import {getDepts} from "../../actions/dept";

const Projects = ({getAllProjects,getDepts, dept,project }) => {

    useEffect(() => {
        getDepts();
        getAllProjects();
      }, []);
    return (
        <Fragment>
        <div className="projects">
              <div className="project-section1">
                  <div className="project-search">
                    <h1 className="project-search-title">Here you will find all projects from <br /> First year to Final year</h1>
                    {/* <div className="search-area">
                        <input type="text" id="project-search" placeholder="e.g.Final year project" />
                        <button type="submit" className="btn">Search</button>
                    </div> */}
                  </div>
                  <img src="/img/projects.png" alt="" className="project-img__1" />
              </div>            
        </div>

        <Category lists={dept.depts} name="departments"/>
        <ProjectList projects={project.projects} id="projects"/>

        </Fragment>
    )
}

Projects.propTypes = {
    getAllProjects: PropTypes.func.isRequired,
    getDepts: PropTypes.func.isRequired,
    dept: PropTypes.object.isRequired,
    project: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
    dept: state.dept,
    project: state.project
  });
export default connect(mapStateToProps, { getAllProjects,getDepts })(Projects);
