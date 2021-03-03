import React, {useEffect, Fragment} from "react";
import PropTypes from 'prop-types';
import {connect } from "react-redux";
import ProjectList from "./ProjectList";
import {getDeptProjs, getSubProjs} from "../../actions/project";
import {getSubs} from "../../actions/subject";

const SubjectWise = ({match, getDeptProjs,getSubProjs, getSubs , subject:{subs} ,project }) => {

    useEffect(() => {
        getSubs(match.params.dept);
        getDeptProjs(match.params.dept);
      }, []);
    return (
        <Fragment>
            <div className="list">
            <p>Subjects</p>
            <div className="dept-list">
            { subs ? (subs.map((sub_item) => (
            <a  key={sub_item + "key"} href="#" className="dept-name" onClick={()=>{getSubProjs(match.params.dept,sub_item)}} > {sub_item}</a>
            )))
                 : <div></div>}
            
            </div>
        </div>
            <ProjectList projects={project.projects}/>
        </Fragment>
    )
}

SubjectWise.propTypes = {
    getDeptProjs: PropTypes.func.isRequired,
    getSubs: PropTypes.func.isRequired,
    getSubProjs: PropTypes.func.isRequired,
    subject: PropTypes.array.isRequired,
    project: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
    subject: state.subject,
    project: state.project
  });
export default connect(mapStateToProps, { getDeptProjs, getSubProjs, getSubs })(SubjectWise);
