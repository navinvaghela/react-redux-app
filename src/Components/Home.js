import React from "react";
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button }from '@material-ui/core';
import { isLogin, logout } from "../Common/utils";

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
      fontStyle: 'italic',
      color: '#87a975'
    },
}));
  
const Home = (props) => {
    const classes = useStyles();

    const handleLogout = () => {
        logout();
        // props.history.push('/login');
        window.location = "/login";
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h4" className={classes.title}>Tasklist Management</Typography>
                    {
                        isLogin() ?
                        <>
                            <Link to={`/dashboard`} className="link-styles">Dashboard</Link>
                            <Link to={`/viewTasks`} className="link-styles">Tasks</Link>
                            <Link to={`/viewJokes`} className="link-styles">Jokes</Link>
                            <Button onClick={handleLogout } color="inherit">Logout</Button>
                        </>    
                        : 
                        <>
                            <Button onClick={() => props.history.push('/login')} color="inherit">Login</Button>
                        </>
                    }
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Home;