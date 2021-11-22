import React, { useEffect, useState } from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DateRange from "@material-ui/icons/DateRange";
import Business from "@material-ui/icons/Business"
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';

import Accessibility from "@material-ui/icons/Accessibility";
// core components
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardIcon from "../../components/Card/CardIcon.js";
import CardFooter from "../../components/Card/CardFooter.js";
import { API, Auth } from 'aws-amplify';
import { getFormattedCurrency } from '../../utils'

import styles from "../../assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function Dashboard() {

  const [employee, setEmployee] = useState({})
  useEffect(async () => {
    const payload = {
      headers: {
        Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`
      }
    };

    API.get("apiaa9cd445", "/employees/10001", payload)
      .then(data => {
        setEmployee(data)
      })
      .catch(err => {
        console.log("err", err)
      });
  }, [])

  const classes = useStyles();
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Business />
              </CardIcon>
              <p className={classes.cardCategory}>Title</p>
              <h3 className={classes.cardTitle}>
                {employee.current_title}
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                As on {new Date().toLocaleDateString()}
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <AttachMoneyIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Salary</p>
              <h3 className={classes.cardTitle}>{getFormattedCurrency(employee.current_salary)}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Per Annum
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <AssignmentIndIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Reports To</p>
              <h3 className={classes.cardTitle}>{employee.manager_name}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Accessibility />
              </CardIcon>
              <p className={classes.cardCategory}>Department</p>
              <h3 className={classes.cardTitle}>{employee.department}</h3>
            </CardHeader>
            <CardFooter stats>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
