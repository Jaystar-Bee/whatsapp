import React, { useState } from "react";

const useToggle = (init) => {
  const [state, setState] = useState(init);

  const toggle = () => {
    setState((prevVal) => {
      return !prevVal;
    });
  };

  return [state, toggle];
};

export default useToggle;
