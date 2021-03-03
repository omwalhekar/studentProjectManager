import React, {useState} from "react";
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import {addProject } from "../../actions/project";

const ProjectForm = ({addProject, history}) => {
    var c, element,rowsToAdd;
	function addRow() {
		rowsToAdd = parseInt(document.getElementById('project-members').value);
	
		var table = document.getElementById("dataTable");
	
		for(var i=0; i < rowsToAdd - 1; i++){
			var rowCount = table.rows.length;
	
			var tr = table.insertRow(rowCount);
	
			var colCount = parseInt(table.rows[0].cells.length);
	
			for(c=0; c < colCount; c++)
			{
				var cell = tr.insertCell(c);
				if (c===0) cell.innerHTML = rowCount;
				else if (c===1){
					element = document.createElement('input');
					element.type = 'text';
					element.id = "member" + (i+1);
					cell.appendChild(element);
				}
			}
		}
	}
	
	const [formData , setFormData] = useState({
		projTitle: '',
		projDescription: '',
		projDomain: '',
		dept: '',
		year: '2022',
		sem: 1,
		subject:'',
		projRepo: '',
		projLink: '',
		members:[],
		images: []
	});
	
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
		images
	} = formData;

	function addMembers(){
		let limit = parseInt(document.getElementById('project-members').value);
		let memberArray = [];
		for(var i=0; i< limit ; i++)
		{	
		
			let nm = document.getElementById("member"+i).value;
			console.log(nm)
			memberArray.push(nm);
		}
		formData.members = memberArray;
	}

	const onChange = e =>
	setFormData({ ...formData, [e.target.name]: e.target.value });

	
    return (
        <div className="form-details">
            <h2 className="form-heading">Project Details</h2>

            <form className="form" method="POST" encType="multipart/form-data"
			onSubmit={e => {
          e.preventDefault();
		  addMembers();
		  addProject(formData, history);
		  console.log(formData);
		  return <Redirect to="/projectspage" />
		  
        }}>
                <label htmlFor="project-title">Project Title :</label>
				<input type="text" id="project-title" name="projTitle" value={projTitle} placeholder="Your Project Title..." required  onChange={onChange}/>
                
                <label htmlFor="project-domain">Project Domain :</label>
                <input type="text" id="project-domain" name="projDomain" value={projDomain} placeholder="Your Project Domain..." required  onChange={onChange}/>

				<label htmlFor="project-dept">Dept :</label>
                <input type="text" id="project-dept" name="dept" value={dept} placeholder="Your Department" required  onChange={onChange}/>
                
                <label htmlFor="batch">Batch :</label>
				<input type="number" name="year" value={year} min="2022" placeholder="e.g. 2022..." required  onChange={onChange}/>

				<label htmlFor="sem">Semester :</label>
				<input type="number" name="sem" value={sem} min="1" max="8" placeholder="Semester" required  onChange={onChange}/>

				<label htmlFor="subject">Subject Name :</label>
				<input type="text" id="subject" name="subject" value={subject} onChange={onChange} placeholder="Your subject name..." required  />

				<label htmlFor="project-description">Project Description :</label>
				<textarea name="projDescription" id="project-description" value={projDescription} placeholder="Your Project Description..." rows="4" cols="50" required onChange={onChange}></textarea>	

				<label htmlFor="project-screenshots">Screenshots of project :</label>
				<input type="file" name="images" id="project-screenshots" value={images} multiple   onChange={onChange}/>

				<label htmlFor="project-repository">Project Repository :</label>
				<input type="text" name="projRepo" id="project-repository" value={projRepo} placeholder="Your project link..."   onChange={onChange}/>

				<label htmlFor="project-repository">Project link :</label>
				<input type="text" name="projLink" id="project-repository" value={projLink} placeholder="Your project link..."   onChange={onChange}/>

				<label htmlFor="project-members">No. of members in group :</label>
                <input type="number" name="project-members" id="project-members" min="0" max="20" onChange={ () => addRow()} required />
                
				<label htmlFor="">Member's Info :</label>
				<table id="dataTable" border="1">
				<tbody>
				<tr>
						<th>Sr.No.</th>
						<th>Name</th>
					</tr>
					<tr>	
						<td><p className="sr-no">1</p></td>
						<td><input type="text" name="name" id="member0"  /></td>						
					</tr>
				</tbody>
						
				</table>
				<input type="submit" name="submit"  className="btn btn-submit" />


            </form>
        </div>
	)
	
	
}


ProjectForm.propTypes = {
	addProject: PropTypes.func.isRequired,
}
export default connect(null, { addProject })(ProjectForm);
