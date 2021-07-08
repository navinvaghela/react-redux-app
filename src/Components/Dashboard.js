import React from "react";
import Home from "./Home";
import '../App.css';
const Dashboard = () => {
    return (
        <>
            <div className="home">
                <Home />
            </div>
            <div className="dashboard">
                <h1>Dashboard</h1>
                <span className="db-text-styles"> Welcome to our website!!!</span>
            </div>
        </>
    )
}

export default Dashboard;