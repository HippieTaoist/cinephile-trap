import {
    useState,
    useEffect
} from 'react';
import {
    isStrongPassword
} from 'validator';



export default function PasswordHooks() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [onFocus, setOnFocus] = useState(false);
    const [onBlur, setOnBlur] = useState(false);

    useEffect(() => {
        if (onFocus) {
            if (password.length > 0) {
                if (!isStrongPassword(password)) {
                    setError("Your password is WEEAAAKKK!!! Try Harder")
                }
            }
        }

        if (onBlur) {
            if (password.length === 0) {
                setError("Empty passwords are not allowed.")
            }
        }
    }, [onFocus, onBlur, password]);

    function handleOnPasswordOnChange(e) {
        setPassword(e.target.value);
    }


    return [password, handleOnPasswordOnChange, error, setOnFocus, setOnBlur];
}