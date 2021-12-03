/*eslint-disable*/
import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
// core components
import styles from "../../assets/jss/material-dashboard-react/components/footerStyle.js";

const useStyles = makeStyles(styles);

export default function Footer() {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <a href="mailto:soham.bhattacharjee@sjsu.edu" className={classes.block}>
                Soham
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="mailto:rajat.banerjee@sjsu.edu" className={classes.block}>
               Rajat
              </a>
            </ListItem>
            
          </List>
        </div>
      </div>
    </footer>
  );
}
