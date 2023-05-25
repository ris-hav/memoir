import React, { useEffect } from "react";

const Alert = ({ msg, type, removeAlert, dur }) => {
  useEffect(() => {
    const timeout = setTimeout(
      () => {
        removeAlert(false, " ", " ", "");
      },
      dur === "long" ? 5000 : 3000
    );
    return () => clearTimeout(timeout);
  }, alert.show);

  return <p className={`alert alert-${type}`}>{msg}</p>;
};

export default Alert;
