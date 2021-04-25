import {
  Paper,
  Container,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { styles} from "../helpers";
import React from 'react';

const useStyles = makeStyles((theme) => {
  return styles;
});

const FooterApp = () => {

  const classes = useStyles();

    <Container>
      <Paper className={classes.paper}>
        <Typography variant="h1" className={classes.mainTitle}>
            Hey, let's finish:
        </Typography>        
      </Paper>
    </Container>
}

export default FooterApp;