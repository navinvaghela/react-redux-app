import { useEffect, useState } from "react";

const useForm = (callback, validate) => {
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if(Object.keys(errors).length === 0 && isSubmitting){
            callback();
        }
    }, [errors]);

    const handleSubmit = () => {
        setErrors(validate(values));
        setIsSubmitting(true);
    };

    const handleChange = (name, value) => {
        setValues(values => ({ ...values, [name]: value }));
    }

    const initializeValues = (name, value) => {
        setValues(values => ({ ...values, [name]: value }));
    }

    return {
        handleChange,
        handleSubmit,
        initializeValues,
        values,
        errors,
    }
    
}

export default useForm;