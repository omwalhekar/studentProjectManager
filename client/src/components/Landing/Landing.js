import React, {Fragment} from "react";
import PropTypes from 'prop-types';
import {connect } from "react-redux";
import Search from "../Search/Search"
import ProjectList from "../Projects/ProjectList";

const Landing = ({project}) => {
    return (
        <Fragment >
                <div className="landing">
            <img src="/img/project-management.png" alt="" className="landing-img" />
            <div className="landing-details">
                <h1 className="landing-heading">Project Management System </h1>
                <p className="landing-desc">Showcase your projects here</p>
                <Search />
            </div>
        </div>
         <ProjectList projects={project.filtered} id="projects" className="filtered"/>        
        </Fragment>
        
        
)
}

Landing.propTypes = {
    project: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
    project: state.project
  });
export default connect(mapStateToProps, {})(Landing);
