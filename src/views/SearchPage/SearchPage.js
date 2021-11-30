import React, { useEffect, useState, useContext } from "react";
import { useParams } from 'react-router-dom'
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";


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
import CardAvatar from "../../components/Card/CardAvatar.js";
import CardBody from "../../components/Card/CardBody.js";
import male from "../../assets/img/faces/male.jpg";
import female from "../../assets/img/faces/female.png"
import { API, Auth } from 'aws-amplify';
import { getFormattedCurrency } from '../../utils'
import { UserContext } from '../../App'

import styles from "../../assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function SearchPage() {
  const userContext = useContext(UserContext);
  const [employee, setEmployee] = useState({})
  const { searchfor } = useParams()
  useEffect(async () => {
    const payload = {
      headers: {
        Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`
      }
    };

    API.get("apiaa9cd445", `/search-result/${searchfor}/${userContext.username}`, payload)
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
        <GridItem xs={12} sm={12} md={12}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={(e) => e.preventDefault()}>
                <img src={employee.gender === 'M' ? male : female} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h1 className={classes.cardTitle}>{`${employee.first_name} ${employee.last_name}`}</h1>
            </CardBody>
          </Card>
        </GridItem>
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
              <h3 className={classes.cardTitle}>{isNaN(employee.current_salary) ?
                employee.current_salary :
                getFormattedCurrency(employee.current_salary)}</h3>
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
