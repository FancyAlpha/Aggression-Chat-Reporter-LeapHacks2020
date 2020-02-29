import React from 'react';

import {Route, Link} from 'react-router-dom';

import Data from "./data";

export default function Landing() {

    return (
        <header className="App-content Main-content">

            <Link to={"/data"}>Link to data page</Link>
            <Route path="/data" component={Data}/>
        </header>
    );
}