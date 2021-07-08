import React from "react";

export default function Validator(values) {
    let errors = {};
    if(Object.keys(values).length > 0){
        if(values.username !== undefined) {
            if (values.username !== "" && /[^a-zA-Z]/.test(values.username)) {
                errors.username = 'Username is invalid';
            }
            if(values.username === "") {
                errors.username = 'Username is required';
            }
        }

        if(values.password !== undefined) {
            if (values.password !== "" && !/^[a-zA-Z0-9]{1,8}$/.test(values.password)) {
                if(values.password.length > 8){
                    errors.password = 'Password is allowed only 8 characters';
                } else {
                    errors.password = 'Password is invalid';    
                }
            } 
            if(values.password === "") {
                errors.password = 'Password is required';
            }
        }
    }
    return errors;
};