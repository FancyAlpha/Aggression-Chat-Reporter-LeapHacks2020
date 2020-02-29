import React from 'react';

import {Route} from 'react-router-dom';

import Landing from './routes/landing';
import Data from "./routes/data";

function App() {
  return (
    <div className="App grey-container">
      <Route path={"/"} exact component={Landing}/>
      <Route path={"/data"} exact component={Data}/>
    </div>
  );
}

export default App;
