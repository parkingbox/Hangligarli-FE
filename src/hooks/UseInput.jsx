import { useState } from "react";

function useInput(initValue) {
  const [value, setValue] = useState(initValue);

  const handler = (e) => {
    setValue(e.target.value);
  };

  return [value, handler];
}

export default useInput;
