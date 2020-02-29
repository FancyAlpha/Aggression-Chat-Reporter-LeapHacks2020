import React from 'react';
import "../App.scss";

import Flag from "../components/flag";
import Container from "@material-ui/core/Container";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";


class Data extends React.Component {

    data = [];

    constructor(props) {
        super(props);

        fetch("https://aggression-detector.herokuapp.com/comments")
            .then(response => response.json())
            .then((jsonData) => {
                // jsonData is parsed json object received from url

                console.log(jsonData);
                this.data = JSON.parse(jsonData);

                console.log(jsonData);
            })
            .catch((error) => {
                // handle your errors here
                console.error(error);
            });
    }

    renderFlags = () => {

        let flags = []

        for (var i = 0; i < 10; i++) {
            flags.push(<Flag username={"this is a name"} text={"description text here"} date={"123"}
                             tags={["bad", "very bad"]}/>);
        }

        return flags;
    };

    render() {
        return (
            <div>
                <AppBar position="static">
                    <Toolbar variant="dense">
                        <Typography variant="h6" color="inherit">
                            Some important text
                        </Typography>
                    </Toolbar>
                </AppBar>

                <Container maxWidth={"md"} fixed>
                    <div className={"flags-list"}>
                        {this.renderFlags()}
                    </div>
                </Container>
            </div>
        );
    }
}

export default Data;
