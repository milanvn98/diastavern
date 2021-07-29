import { useState, useCallback, useEffect } from "react";

const useValidate = (validation, init) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  useEffect(() => {
    init && setEnteredValue(init)
  }, [init])

  const valueIsValid = validation(enteredValue);
  const hasError = !valueIsValid && isTouched;

  const valueClass = hasError ? "invalid" : "";

  const valueChangeHandler = useCallback((value) => {
    setEnteredValue(value);
  }, []);

  const inputBlurHandler = useCallback(() => {
    setIsTouched(true);
  }, []);

  const reset = useCallback(() => {
    setEnteredValue("");
    setIsTouched(false);
  },[]);

  return {
    value: enteredValue,
    isValid: valueIsValid,
    valueChangeHandler,
    inputBlurHandler,
    reset,
    valueClass,
  };
};

export default useValidate;
