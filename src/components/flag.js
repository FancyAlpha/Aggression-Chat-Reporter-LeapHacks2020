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
        this.colorMap["bad"] = "primary";
        this.colorMap["very bad"] = "secondary";
        this.colorMap["very very bad"] = "error";
    }

    renderTags = (styles) => {

        var chips = [];

        for (let i = 0; i < this.props.tags.length; i++) {
            chips.push(<Chip color={this.colorMap[this.props.tags[i]]}
                             label={this.props.tags[i]}
                             style={{marginRight: "8px"}}/>);
        }

        return chips;
    };

    render() {
        return (
            <Card className={"flag"}>
                <CardContent>

                    <Typography variant="h5" component="h2">
                        {this.props.text}
                    </Typography>

                    <Typography variant="body2" component="p">
                        <b>{this.props.username}</b>&nbsp;|&nbsp;{this.props.date}
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