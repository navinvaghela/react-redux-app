import React, { forwardRef, useEffect, useState } from "react";
import MaterialTable from 'material-table';
import Home from "./Home";
import axios from 'axios';
import { Clear, FilterList, Search, ArrowDownward, AddBox, Check, DeleteOutline, ChevronRight, Edit, SaveAlt, FirstPage, LastPage, ChevronLeft, Remove, ViewColumn } from '@material-ui/icons';
import AnimationLoader from "../animation.gif";
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


const Jokes = (props) => {
    const [jokesData, setJokesData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        axios.get("https://official-joke-api.appspot.com/jokes/ten")
            .then(response => {
                setJokesData(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.log(error);
            });
    }, [props]);

    return (
        <>
            <div className="home">
                <Home />
            </div>
            <div className="tasks">
                <h1>Jokes</h1>
                {
                    isLoading ?  
                        <img width="400" height="400" src={AnimationLoader} name="AnimationLoader" />
                        :   
                        <MaterialTable
                            columns={
                            [
                                { title: 'Punchline', field: 'punchline' },
                                { title: 'Setup', field: 'setup' },
                                { title: 'Type', field: 'type' },
                            ]}
                            data={jokesData}
                            title="Jokes List"
                            icons={tableIcons}
                            options={{
                                filtering: true,
                                actionsColumnIndex: -1
                            }}
                            actions={[
                                {
                                    icon: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
                                    tooltip: 'Delete Jokes',
                                    onClick: (event, rowData) => alert("You want to delete " + rowData.name)
                                }
                            ]}
                        />
                    }
            </div>
        </>
    )
}

export default Jokes;