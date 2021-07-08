import React ,{ useEffect, useMemo, useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button} from '@material-ui/core';
import useForm from "../Common/useForm";
import Validator from "../Common/Validator";
import { login } from "../Common/utils";

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch'
      },
      textAlign:'center'
    },
}));
  
const data = [
    {fieldName: 'username', fieldValue: ''},
    {fieldName: 'password', fieldValue: ''},
];
const Login = (props) => {
    const classes = useStyles();

    const {
        handleChange,
        handleSubmit,
        initializeValues, 
        values,
        errors
    } = useForm(onSingin, Validator);

    useEffect(() => {
        data.map((item) => {
            initializeValues(item.fieldName, item.fieldValue);
            return item;
        });
    }, []);
 
    function onSingin() {
        const key = Object.keys(errors);
        if(key.length === 0){
            login();
            props.history.push('/dashboard');
        }
      }

    
    const handleFieldChange = (event, ) => {
        handleChange(event.target.name, event.target.value);    
    }
    
    return (
        <div>
            <h1>Login</h1>
            <form className={classes.root} >    
                <TextField 
                    helperText={Object.keys(errors).length > 0 && errors.username !== undefined ? errors.username: ''} 
                    value={values.username} 
                    name="username" 
                    label="Username" 
                    onChange={handleFieldChange}
                />
                <TextField 
                    helperText={Object.keys(errors).length > 0 && errors.password !== undefined ?  errors.password : ''} 
                    value={values.password} 
                    name="password"  
                    label="Password" 
                    onChange={handleFieldChange}
                    inputProps={{ maxLength: 8 }}
                />
                <Button variant="contained" color="primary" onClick={handleSubmit}>Login</Button>
            </form>
        </div>
    )
}

export default Login;