import {
    useState
} from 'react';
import {
    isAlpha
} from 'validator';

export default function FirstNameHooks() {
    const [firstName, setFirstName] = useState("");
    const [error, setError] = useState("");

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
    return [firstName, handleFirstNameOnChange, error];

}