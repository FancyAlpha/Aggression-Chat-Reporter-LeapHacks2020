import React from 'react';

import {Route} from 'react-router-dom';

import Landing from './routes/landing';
import Data from "./routes/data";

import './App.css';

function App() {
  return (
    <div className="App">
      <Route path={"/"} exact component={Landing}/>
      <Route path={"/data"} exact component={Data}/>
    </div>
  );
}

export default App;
