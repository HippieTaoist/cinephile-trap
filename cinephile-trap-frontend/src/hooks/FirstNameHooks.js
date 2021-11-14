import {
    useState,
    useEffect
} from 'react';
import {
    isAlpha
} from 'validator';

export default function FirstNameHooks() {
    const [firstName, setFirstName] = useState("");
    const [error, setError] = useState("");
    const [onFocus, setOnFocus] = useState(false);
    const [onBlur, setOnBlur] = useState(false);

    useEffect(() => {
        if (onFocus) {
            if (firstName.length > 0) {
                if (!isAlpha(firstName)) {
                    setError("First name must be letters only");
                }
            }
        }

        if (onBlur) {
            if (firstName.length === 0) {
                setError("First name not be empty");
            }
        }
    }, [firstName, onFocus, onBlur])



    function handleFirstNameOnChange(e) {
        if (!isAlpha(e.target.value)) {

            setError("Cannot have special characters in first name.")
        }
        if (e.target.value.length === 0) {
            setError("First name can not be empty.");
        }
        if (isAlpha(e.target.value)) {
            setError("");
            setFirstName(e.target.value);
        }
    }
    return [firstName, handleFirstNameOnChange, error, setOnFocus, setOnBlur];

}