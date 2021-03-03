import React, { Fragment } from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { deleteProj } from "../../actions/project";
import { connect } from "react-redux";

const ProjectList = ({ projects, deleteProj, token }) => {
  return (
    <div className="project-list">
      {projects ? (
        projects.map(project => (
          <div className="card" key={project._id}>
            <div className="card-head">
              <div className="card-details">
                <h3 className="card-title">{project.projTitle}</h3>
                <p className="card-desc">{project.projDescription}</p>
              </div>
              <p className="card-date">
                {moment(project.date).format("DD / MM / YY")}
              </p>
            </div>

            <div className="card-body">
              <p className="project-details" id="">
                <span>Project Domain: </span>
                {project.projDomain}
              </p>

              <p className="project-details" id="">
                <span>Subject: </span>
                {project.subject}
              </p>

              <p className="project-details" id="">
                <span>Batch: </span>
                {project.year}
              </p>

              <p className="project-details" id="">
                <span>Semester: </span>
                {project.sem}
              </p>

              <p className="project-details" id="">
                <span>Department: </span>
                {project.dept}
              </p>

              <p className="project-details" id="">
                <span>Members: </span>
                {project.members &&
                  project.members.map(member => {
                    return (
                      <p id={member} className="member-name">
                        {member}{" "}
                      </p>
                    );
                  })}
              </p>

              <p className="project-details" id="">
                <span>Project Repository: </span>
                <a href={project.projRepo}>{project.projRepo}</a>
              </p>

              <p className="project-details" id="">
                <span>Project Link: </span>
                <a href={project.projLink}>{project.projLink}</a>
              </p>

              <p className="project-details" id="">
                <span>Project Screenshots: </span>
              </p>
              <div className="project-images">
                <a>
                  <img src="/img/ss1.png" alt="" className="project-ss" />
                </a>
                <a>
                  <img src="/img/ss2.png" alt="" className="project-ss" />
                </a>
                <a>
                  <img src="/img/ss3.png" alt="" className="project-ss" />
                </a>
                <a>
                  <img src="/img/ss4.png" alt="" className="project-ss" />
                </a>
                <a>
                  <img src="/img/ss4.png" alt="" className="project-ss" />
                </a>
              </div>
              <div className="delete-div">
                {!token ? (
                  <Fragment></Fragment>
                ) : (
                  <button
                    className="delete-btn"
                    onClick={() => {
                      if (window.confirm("Your Project will be deleted"))
                        deleteProj(project._id);
                    }}>
                    Delete Project
                  </button>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div> </div>
      )}
    </div>
  );
};

ProjectList.propTypes = {
  project: PropTypes.object.isRequired,
  deleteProj: PropTypes.func.isRequired,
  token: PropTypes.string,
};

const mapStateToProps = state => ({
  project: state.project,
  token: state.auth.token,
});

export default connect(mapStateToProps, { deleteProj })(ProjectList);
