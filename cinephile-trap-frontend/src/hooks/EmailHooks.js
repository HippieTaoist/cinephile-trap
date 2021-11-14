import {
    useState,
    useEffect
} from 'react';
import {
    isEmail
} from "validator";
import {
    toast
} from "react-toastify";

export default function EmailHooks() {
    const [email, setEmail] = useState('')
    const [error, setError] = useState("");
    const [onFocus, setOnFocus] = useState(false);
    const [onBlur, setOnBlur] = useState(false);

    useEffect(() => {
        if (onFocus) {
            if (email.length > 0) {
                if (!isEmail) {
                    toast.warn("Please enter a valid email address")
                }
            }
        }

        if (onBlur) {
            if (email.length === 0) {
                setError("Please enter SOMEThiNG IN BOX")
            }
        }
    }, [email, setOnFocus, setOnBlur]);

    function handleEmailOnChange(e) {
        if (!isEmail(e.target.value)) {
            setError("Cannont be invalid email address")
        }
        if (isEmail(e.target.value)) {
            setEmail(e.target.value);
            setError("");
        }
    }


    return [email, handleEmailOnChange, error, setOnFocus, setOnBlur]
}