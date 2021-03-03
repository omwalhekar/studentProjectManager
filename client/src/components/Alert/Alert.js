import React from "react";

function Alert({ msg }) {
  return (
    <div className="alert-box">
      <p className="alert">{msg}</p>
    </div>
  );
}

export default Alert;
