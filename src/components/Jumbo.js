import React from "react";

const Jumbotron = props => (
  <div className="jumbotron jumbotron-fluid">
    <div className="container">
      <h1 className="display-4">
        <strong>Clicky Game!</strong>
      </h1>
      <p className="lead">
        {`Click on an image to earn points, but don't click on any more than once!`}
      </p>
      <a className="btn btn-primary btn-lg" onClick={props.onClick} role="button">
        <strong id="button">Scroll Down to Play!</strong>
      </a>
    </div>
  </div>
);

export default Jumbotron