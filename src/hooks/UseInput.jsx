import { useState } from "react";

function useInput(initValue) {
  const [value, setValue] = useState(initValue);
  const [valid, setValid] = useState({
    isInputValidated: false,
    message: "",
  });

  const Handler = (e) => {
    setValue(e.target.value);
  };

  return [value, Handler];
}

export default useInput;
