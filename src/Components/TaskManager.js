
import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import { TextareaAutosize, TextField, Button, FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import '../App.css';


const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        // width: '25ch',
      },
    },
    textarea: {
       width: '219px',   
    },
    startDate: {
        width: '219px',   
    },
    endDate: {
        width: '219px',   
    },
    status: {
        width: '219px',   
    },
}));

const TaskManager = (props) => {
    const classes = useStyles();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [status, setStatus] = useState('');

    useEffect(() => {
        if(props.location.pathname.split("/")[2] !== undefined) {
            props.tasks.map((item, index) => {
                if(index === Number(props.location.pathname.split("/")[2]) ){
                    setName(item.name);
                    setDescription(item.description);
                    setStartDate(item.startDate);
                    setEndDate(item.endDate);
                    setStatus(item.status);
                }
                return item;
            })
        }
    }, []);

    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
    };

    const saveTask = () => {
        const newData = [...props.tasks];
        if(props.location.pathname.split("/")[2] !== undefined) {
            const updatedData = newData.map((item, index) => {
                if(Number(props.location.pathname.split("/")[2]) === item.tableData.id) {
                    item.name = name;
                    item.description = description;
                    item.startDate = startDate;
                    item.endDate = endDate;
                    item.status = status;    
                }
                return item;
            });
            
            props.saveTask(updatedData);
            props.history.push('/viewTasks');
        } 
        else 
        {
            const formdata = {
                name: name,
                description: description,
                startDate: startDate,
                endDate: endDate,
                status: status
            }
            newData.push(formdata);
            props.saveTask(newData);
            props.history.push('/viewTasks');
        }
    }
    
    return (
        <>
            <div className="task-manager">
                <h1>Tasks Manager</h1>
                <div className="task-form">
                    <form className={classes.root} noValidate autoComplete="off">
                        <div className="">
                            <TextField id="outlined-basic" label="Task name" value={name} variant="outlined" onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="">
                            <TextareaAutosize className={classes.textarea} name="description"  value={description}  aria-label="minimum height" minRows={3} placeholder="Minimum 3 rows" onChange={(e) => setDescription(e.target.value)} ></TextareaAutosize>
                        </div>
                        <div className="">
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid container justifyContent="space-around">
                                    <KeyboardDatePicker
                                        className={classes.startDate}
                                        disableToolbar
                                        variant="inline"
                                        format="MM/dd/yyyy"
                                        margin="normal"
                                        id="date-picker-inline"
                                        label="Start Date"
                                        value={startDate}
                                        onChange={handleStartDateChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </Grid>
                            </MuiPickersUtilsProvider>
                        </div>
                        
                        <div className="">
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid container justifyContent="space-around">
                                    <KeyboardDatePicker
                                        className={classes.endDate}
                                        disableToolbar
                                        variant="inline"
                                        format="MM/dd/yyyy"
                                        margin="normal"
                                        id="date-picker-inline"
                                        label="End Date"
                                        value={endDate}
                                        onChange={handleEndDateChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </Grid>
                            </MuiPickersUtilsProvider>

                        </div>
                    
                        <div className="">
                            <FormControl className={`${classes.status} formControl`}>
                                <InputLabel>Status</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                >
                                    <MenuItem value=""><em>None</em></MenuItem>
                                    <MenuItem value={'Running'}>Running</MenuItem>
                                    <MenuItem value={'Expire'}>Expire</MenuItem>
                                    <MenuItem value={'scheduled'}>scheduled</MenuItem>
                                    </Select>
                            </FormControl>           
                        </div>
                        <div className="">
                            <Button variant="contained" color="primary" onClick={saveTask}>Save</Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}


const mapStatetoProps = state => {
    return {
        tasks: state.tasks
    }
}

const mapDispatchtoProps = dispatch => {
    return {
        saveTask: (taskData) => dispatch({ type: "SAVE_TASK", data: taskData }),
    }    
} 
export default connect(mapStatetoProps, mapDispatchtoProps) (TaskManager);
