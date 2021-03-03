import React, {useState} from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {filterProject, clearFilter} from "../../actions/project";

const Search = ({filterProject, clearFilter}) => {

    const [keyword, setKeyword] = useState("");
    const onChange = e => setKeyword(e.target.value);

    function checkEmpty(e){
        if(!e.target.value)
            clearFilter();
        
       }
	
    return (
        <div className="search-field">
            <input type="text" className="search-bar" name="search-input"
            onChange={(e) => {onChange(e); checkEmpty(e);}}  placeholder="Search Projects"/>
            <button 
            className="search-btn"               
            onClick={()=> {
                filterProject(keyword)}}><i className="fas fa-search"></i></button>
        </div> 
    )
}

Search.propTypes = {
    filterProject: PropTypes.func.isRequired,
    clearFilter: PropTypes.func.isRequired,
}

export default connect(null, { filterProject , clearFilter})(Search);
