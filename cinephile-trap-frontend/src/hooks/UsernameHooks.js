import {
    useState,
    useEffect
} from 'react'
import {
    isAlphanumeric
} from 'validator'

export default function UsernameHooks() {
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");
    const [onFocus, setOnFocus] = useState(false);
    const [onBlur, setOnBlur] = useState(false);

    useEffect(() => {

        if (onFocus) {
            if (username.length > 0) {
                if (!isAlphanumeric(username)) {
                    setError("Username can only have letters and numbers.");
                }
            }
        }

        if (onBlur) {
            if (username.length === 0) {
                setError("Username can not be empty.");
            }
        }
    }, [username, setOnFocus, setOnBlur]);

    function handleUsernameOnChange(e) {
        if (!isAlphanumeric(e.target.value)) {
            setError("Letters and Numbers only on the Username")
        }
        if (isAlphanumeric(e.target.value)) {
            setUsername(e.target.value);
            setError("");
        }
    }


    return [username, handleUsernameOnChange, error, setOnFocus, setOnBlur]
}