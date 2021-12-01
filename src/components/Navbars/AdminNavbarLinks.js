import React from "react";
import classNames from "classnames";
import { useHistory } from 'react-router-dom'
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Hidden from "@material-ui/core/Hidden";
import Poppers from "@material-ui/core/Popper";
import Divider from "@material-ui/core/Divider";
// @material-ui/icons
import Person from "@material-ui/icons/Person";
import Search from "@material-ui/icons/Search";
// core components
import CustomInput from "../CustomInput/CustomInput.js";
import Button from "../CustomButtons/Button.js";
import { API, Auth } from 'aws-amplify';
import styles from "../../assets/jss/material-dashboard-react/components/headerLinksStyle.js";
import { UserContext } from "../../App.js";
import { throttle } from 'lodash'
import BounceLoader from "react-spinners/BounceLoader"

const useStyles = makeStyles(styles);

export default function AdminNavbarLinks() {
  const classes = useStyles();
  const [openProfile, setOpenProfile] = React.useState(null);
  const [openSearchResults, setopenSearchResults] = React.useState(null)
  const [searchHits, setSearchHits] = React.useState([])
  const [searching, setSearching] = React.useState(false)
  const history = useHistory();

  const callSearchAPI = async (searchText, searchTextBox) => {
    const payload = {
      headers: {
        Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`
      }
    };
    setSearching(true)
    API.get("apiaa9cd445", `/search/${searchText}`, payload)
      .then(data => {
        setSearching(false)
        if (data.matches && data.matches.length > 0) {
          setSearchHits(data.matches.slice(0, 5))
          setopenSearchResults(searchTextBox)
        }
        else {
          setSearchHits([])
          setopenSearchResults(null)
        }
      })
      .catch(err => {
        setSearching(false)
        setSearchHits([])
        setopenSearchResults(null)
        console.log("err", err)
      });
  }

  const handleSearchItemClick = (emp_no) => {
    setopenSearchResults(null)
    history.push(`/dashboard/search/${emp_no}`)
  }

  const throttledSearchHandler = throttle((event) => {
    const searchText = event.target.value
    console.log(searchText)
    if (searchText.length > 3) {
      //call lambda to fetch matching names
      callSearchAPI(searchText, event.target)
    } else {
      setopenSearchResults(null)
    }
  }, 500)

  const handleClickProfile = (event) => {
    if (openProfile && openProfile.contains(event.target)) {
      setOpenProfile(null);
    } else {
      setOpenProfile(event.currentTarget);
    }
  };
  const handleCloseProfile = () => {
    setOpenProfile(null);
  };
  return (<UserContext.Consumer>
    {(user) => {
      return <div>
        <div className={classes.searchWrapper}>
          <CustomInput
            formControlProps={{
              className: classes.margin + " " + classes.search,
            }}
            inputProps={{
              onChange: throttledSearchHandler,
              placeholder: "Search",
              inputProps: {
                "aria-label": "Search",
              },
            }}
          />
          <span color="white" className={classes.searchLoading} aria-label="edit" justIcon round>
            <BounceLoader loading={searching} color={'#36D7B7'} size={20} />
          </span>
          <div className={classes.manager}>
            <Poppers
              open={Boolean(openSearchResults)}
              anchorEl={openSearchResults}
              transition
              disablePortal
              className={
                classNames({ [classes.popperClose]: !openSearchResults }) +
                " " +
                classes.popperNav
              }
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  id="notification-menu-list-grow"
                  style={{
                    transformOrigin:
                      placement === "bottom" ? "center top" : "center bottom",
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleCloseProfile}>
                      <MenuList role="menu">
                        {searchHits.map(hit => {
                          return <MenuItem
                            onClick={() => { handleSearchItemClick(hit.emp_no) }}
                            className={classes.dropdownItem}
                          >
                            {hit.emp_name}
                          </MenuItem>
                        })}
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Poppers>
          </div>
        </div>
        <div className={classes.manager}>
          <Button
            color={window.innerWidth > 959 ? "transparent" : "white"}
            justIcon={window.innerWidth > 959}
            simple={!(window.innerWidth > 959)}
            aria-owns={openProfile ? "profile-menu-list-grow" : null}
            aria-haspopup="true"
            onClick={handleClickProfile}
            className={classes.buttonLink}
          >
            <Person className={classes.icons} />
            <Hidden mdUp implementation="css">
              <p className={classes.linkText}>Profile</p>
            </Hidden>
          </Button>
          <Poppers
            open={Boolean(openProfile)}
            anchorEl={openProfile}
            transition
            disablePortal
            className={
              classNames({ [classes.popperClose]: !openProfile }) +
              " " +
              classes.popperNav
            }
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="profile-menu-list-grow"
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom",
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleCloseProfile}>
                    <MenuList role="menu">
                      <MenuItem
                        onClick={() => {
                          user.signOut()
                          window.location.href = "/"
                        }}
                        className={classes.dropdownItem}
                      >
                        Logout
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Poppers>
        </div>
      </div>
    }}
  </UserContext.Consumer>
  );
}
