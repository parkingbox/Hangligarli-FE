import { useState } from "react";

function useInput(initValue) {
  const [value, setValue] = useState(initValue);

  const Handler = (e) => {
    setValue(e.target.value);
  };

  return [value, Handler];
}

export default useInput;
