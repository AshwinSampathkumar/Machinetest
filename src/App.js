import React,{Component} from 'react';
import "antd/dist/antd.css";
import { BrowserRouter, Route, Switch, withRouter } from "react-router-dom";
import './App.css';
import Dashboard from './Components/Main/Dashboard'
import Login from './Components/Auth/Login'
import Details from './Components/Details/Details'

class App extends Component {
  render(){
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path="/" component={Dashboard} exact />
            <Route path="/login" component={Login} exact />
            <Route path="/details" component={Details} exact />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
