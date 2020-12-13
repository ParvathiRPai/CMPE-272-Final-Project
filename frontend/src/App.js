
import './App.css';
import React from "react";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import AppWithRouterAccess from './AppWithRouterAccess';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
    <React.Fragment>
      <Router>
        <AppWithRouterAccess/>
      </Router>
    </React.Fragment>
    </div>
  );
}

export default App;
