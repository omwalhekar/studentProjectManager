import React from "react";

const Category = ({lists, name}) => {
    return (
        <div className="list">
            <p>{name}</p>
            <div className="dept-list">
            { lists ? (lists.map((list_item) => (
            <a key={list_item._id} href={"/subjects/" + list_item.name } className="dept-name" >{list_item.name} </a>
            )))
                 : <div></div>}
            
            </div>
        </div>
        
)
}

export default Category;
