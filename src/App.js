import React from 'react';

import {Route} from 'react-router-dom';

import Landing from './routes/landing';
import Data from "./routes/data";

import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import {orange} from "@material-ui/core/colors";

function App() {
    return (
        <div className="App grey-container">
            <Route path={"/"} exact component={Landing}/>
            <Route path={"/data"} exact component={Data}/>
        </div>
    );
}

export default App;
