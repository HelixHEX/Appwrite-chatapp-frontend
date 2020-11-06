import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

//Components
import Login from "./Containers/Login/Login";
import Chat from "./Containers/Chat/Chat";


const App = () => {
  return (
    <Router >
      <div>
        <Route exact path="/" render={(props) => <Login {...props} />} />
        <Route exact path="/chat" render={(props) => <Chat {...props} />} />
      </div>
    </Router>
  );
};

export default App;
