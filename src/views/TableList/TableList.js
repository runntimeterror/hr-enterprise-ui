import React, { useState, useEffect } from "react";
import { API, Auth, Storage } from 'aws-amplify';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Table from "../../components/Table/Table.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";
import { extractArrayFromResponse, getFormattedCurrency } from "../../utils"

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
};

const useStyles = makeStyles(styles);

export default function TableList() {
  const [historicalDepartments, setHistoricalDepartments] = useState([[]])
  const [historicalSalaries, setHistoricalSalaries] = useState([[]])
  const [historicalTitles, setHistoricalTitles] = useState([[]])

  useEffect(async () => {
    const payload = {
      headers: {
        Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`
      }
    };

    API.get("apiaa9cd445", "/history/10009", payload)
      .then(data => {
        setHistoricalDepartments(extractArrayFromResponse(data.departments))
        setHistoricalSalaries(extractArrayFromResponse(data.salaries))
        setHistoricalTitles(extractArrayFromResponse(data.titles))
      })
      .catch(err => {
        console.log("err", err)
      });
  }, [])
  const classes = useStyles();
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Historical Salary</h4>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["Salary", "From (Date)", "To (Date)"]}
              tableData={historicalSalaries}
            />
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Historical Departments</h4>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["Department No", "From (Date)", "To (Date)", "Department Name"]}
              tableData={historicalDepartments}
            />
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Historical Titles</h4>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["Title", "From (Date)", "To (Date)"]}
              tableData={historicalTitles}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
