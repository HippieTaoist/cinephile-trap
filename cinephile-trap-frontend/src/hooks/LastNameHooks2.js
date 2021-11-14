import {
    useState,
    useEffect,
} from 'react';

import {
    isAlpha
} from 'validator'

function LastNameHooks() {
    const [lastNames, setLastNames] = useState('');
    const [errors, setErrors] = useState('')


    function handleLastNamesOnChange(e) {
        if (!isAlpha(e.target.value)) {
            setErrors("Lastname error");

        }

        if (e.target.value.length === 0) {
            setErrors("lasdalskjdflaksjdsf")
        }
        if (isAlpha(e.target.value)) {
            setErrors("");
            setLastNames(e.target.value)
        }

    }
    return {
        lastNames,
        handleLastNamesOnChange,
        errors
    }
}
export default LastNameHooks()