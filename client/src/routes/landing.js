import React from 'react';
import "../App.scss";

import {Route, Link} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import Data from "./data";

export default function Landing() {

    return (
        <CssBaseline>
            <Link to={"/data"}>Link to data page</Link>
            <Route path="/data" component={Data}/>
        </CssBaseline>
    );
}