import React from "react";

const PhotoGrid = props => (
  <div className="container">
    <div className="row">
      {props.list.map(item => (
        <div className="my-3 col-3 text-center">
          <img src={item.image} alt={item.id} id={item.id} onClick={props.onClick} className="img-thumbnail" />
        </div>
      ))}
    </div>
  </div>
);

export default PhotoGrid;