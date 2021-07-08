
import { Switch, BrowserRouter as Router } from 'react-router-dom';
import Login from './Components/Login';
import Home from './Components/Home';
import Dashboard from './Components/Dashboard';
import Tasks from './Components/Tasks';
import Jokes from './Components/Jokes';
import TaskManager from './Components/TaskManager';
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import './App.css';

function App() {
  return (
    <div className="App">
      <Router >
        <Switch>
          <PublicRoute restrited={true} exact path="/login" component={Login} />
          <PublicRoute restricted={false} component={Home} path="/" exact />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute path="/viewTasks" component={Tasks} />
          <PrivateRoute path="/viewJokes" component={Jokes} />
          <PrivateRoute path="/manageTask" component={TaskManager} />
          <PrivateRoute path="/manageTask/:id" component={TaskManager} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
