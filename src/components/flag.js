import React from "react";
import "../App.scss";

import {Box, Card, CardActions, CardContent,} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import {red} from "@material-ui/core/colors";


class Flag extends React.Component {

    colorMap = {};

    constructor(props) {
        super(props);
        this.colorMap["toxic"] = "#d32f2f";
        this.colorMap["severe_toxic"] = "#b71c1c";
        this.colorMap["obscene"] = "#6a1b9a";
        this.colorMap["threat"] = "#ad1457";
        this.colorMap["insult"] = "#fbc02d";
        this.colorMap["identity_hate"] = "#5c6bc0";
    }

    renderTags = () => {

        var chips = [];

        console.log(this.colorMap["toxic"]);
        console.log(this.colorMap);
        for (let i = 0; i < this.props.tags.length; i++) {
            chips.push(<Chip //color={this.colorMap[this.props.tags[i]]}
                label={this.props.tags[i]}
                style={{
                    marginRight: "8px",
                    color: "white",
                    backgroundColor: this.colorMap[this.props.tags[i]],
                }}
            />);
        }

        return chips;
    };

    render() {
        return (
            <Card className={"flag"}
                  style={{
                      backgroundColor:
                          this.props.severity == 1 ? "#fff3e0"
                              : this.props.severity == 2 ? "#ffe0b2"
                              : this.props.severity == 3 ? "#ffcc80"
                                  : this.props.severity == 4 ? "#ffb74d"
                                      : this.props.severity == 5 ? "#ff8a65" : "#e57373",
                  }}>
                <CardContent>

                    <Typography variant="h5" component="h2">
                        {this.props.text}
                    </Typography>

                    <Typography variant="body2" component="p">
                        <b>{this.props.username}</b>&nbsp;|&nbsp;{this.props.date}
                    </Typography>

                    <Typography variant="body2" component="p">
                        <b>Severity:</b> {this.props.severity}&nbsp;<br/>
                        <b>Channel:</b> {this.props.channel}
                    </Typography>
                    <Box mt={1}>{this.renderTags()}</Box>
                </CardContent>

                {/*<CardActions>*/}
                {/*    <Button size="small">Remove</Button>*/}
                {/*</CardActions>*/}
            </Card>
        );
    }
}

export default Flag;