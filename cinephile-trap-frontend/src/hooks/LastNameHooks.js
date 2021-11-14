import { useState, useEffect } from "react";
import { isAlpha } from "validator";

export default function LastNameHooks() {
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [onFocus, setOnFocus] = useState(false);
  const [onBlur, setOnBlur] = useState(false);

  useEffect(() => {
    if (onFocus) {
      if (lastName.length > 0) {
        if (!isAlpha) {
          setError("Can not have special characters in the last name");
        }
      }
    }

    if (onBlur) {
      if (lastName.length === 0) {
        setError("Can not be empty");
      }
    }
  }, [lastName, onFocus, onBlur]);

  function handleLastNameOnChange(e) {
    if (!isAlpha(e.target.value)) {
      setError("Can not have special characters or numbers");
    }
    if (isAlpha(e.target.value)) {
      setLastName(e.target.target);
      setError("");
    }
  }

  return [lastName, handleLastNameOnChange, error, setOnFocus, setOnBlur];
}
