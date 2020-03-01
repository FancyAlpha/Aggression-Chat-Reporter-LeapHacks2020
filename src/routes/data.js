import React from 'react';
import "../App.scss";

import Flag from "../components/flag";
import Container from "@material-ui/core/Container";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
import {deepPurple, red} from "@material-ui/core/colors";
import Box from "@material-ui/core/Box";

const theme = createMuiTheme({
    palette: {
        primary: {main: deepPurple["700"]},
        secondary: {main: red["A200"]},
    },
});

class Data extends React.Component {

    state = {
        data: [],
    };

    constructor(props) {
        super(props);

        const proxyurl = "https://cors-anywhere.herokuapp.com/";

        var request = "https://aggression.herokuapp.com/comments";

        fetch(proxyurl + request)
            .then(response => response.json())
            .then((jsonData) => {
                // jsonData is parsed json object received from url

                this.setState({data: jsonData});
                console.log(this.data);
            })
            .catch((error) => {
                // handle your errors here
                console.error(error);
            });

        console.log("finished parsing");
    }


    renderFlags = () => {

        let flags = [];
        console.log("Hello");

        console.log(this.state.data);


        // flags.push(<Flag username={"dummy"}
        //                  text={"dummy is wrong"}
        //                  date={"date"}
        //                  tags={["toxic", "severe_toxic", "obscene", "threat", "insult", "identity_hate"]}/>);

        for (var i = 0; i < this.state.data.length; i++) {
            console.log(this.state.data[i]);


            if (this.state.data[i]["processed"] == 1) {
                var date = new Date(this.state.data[i]["created"]);

                var tag_list = this.state.data[i].tags;// ? this.state.data[i].tags : ["toxic"];
                flags.push(<Flag username={this.state.data[i]["userName"]}
                                 text={this.state.data[i]["message"]}
                                 date={date.toLocaleTimeString() + " " + date.toDateString()}
                                 tags={tag_list}/>);
            }
        }

        return flags;
    };

    render() {
        return (
            <ThemeProvider theme={theme}>
                {/*{console.log(theme)}*/}
                <Box boxShadow={3}
                     style={{background: theme.palette.primary.main}}
                     className={"header"}>
                    <Typography variant="h1" color="inherit">
                        <span className={"title-text"}>Paragon</span>
                    </Typography>

                    <Typography variant="h5" color="inherit">
                        <i className={"title-subtitle"}>Slack Edition</i>
                    </Typography>
                </Box>

                <Container maxWidth={"md"} fixed>
                    <div className={"flags-list"}>
                        {this.renderFlags()}
                    </div>
                </Container>
            </ThemeProvider>
        );
    }
}

export default Data;
