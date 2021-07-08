import React, { forwardRef, useEffect, useState } from "react";
import MaterialTable from 'material-table';
import { generatePath } from "react-router-dom";
import { connect } from "react-redux";
import Home from "./Home";
import { Clear, FilterList, Search, ArrowDownward, AddBox, Check, DeleteOutline, ChevronRight, Edit, SaveAlt, FirstPage, LastPage, ChevronLeft, Remove, ViewColumn } from '@material-ui/icons';
import '../App.css';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};


const Tasks = (props) => {
    const [taskData, setTaskData] = useState([]);
    useEffect(() => {
        if(props.tasks === undefined){
            props.getTask();
        } else {
            setTaskData(props.tasks);
        }
    }, []);
    
    return (
        <>
            <div className="home">
                <Home />
            </div>
            <div className="tasks">
                <h1>Tasks</h1>
                <MaterialTable
                    columns={
                    [
                        { title: 'Task Name', field: 'name' },
                        { title: 'Description', field: 'description' },
                        { title: 'Status', field: 'status' },
                    ]}
                    data={taskData}
                    title="Task List"
                    icons={tableIcons}
                    options={{
                        filtering: true,
                        actionsColumnIndex: -1

                    }}
                    actions={[
                        {
                            icon: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
                            tooltip: 'Edit Task',
                            onClick: (event, rowData) => props.history.push("manageTask/"+rowData.tableData.id)
                        },
                        {
                            icon: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
                            tooltip: 'Delete Task',
                            onClick: (event, rowData) => alert("You want to delete " + rowData.name)
                        },
                        {
                            icon: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
                            tooltip: 'Add User',
                            isFreeAction: true,
                            onClick: () => props.history.push('/manageTask')
                        }
                    ]}  
                />
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
        getTask: () => dispatch({ type: "GET_TASK" }),
    }    
} 
export default connect(mapStatetoProps, mapDispatchtoProps) (Tasks);