import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import './Dashboard.css'
import EmployeeCard from './Card';
import Upload from './Files/Upload'
import List from './Files/List'

const API_ENDPOINT = 'http://localhost:80'

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Dashboard() {
  let imageUrl = `https://randomuser.me/api/portraits/`
  const imageIndex = Math.floor(Math.random() * 100)
  const [value, setValue] = useState(0);
  const [employee, setEmployee] = useState({ currentDepartmentName: ``, currentSalary: ``, currentTitle: `` })
  useEffect(() => {
    const getEmployeeDetails = `${API_ENDPOINT}/employees/10018`
    fetch(getEmployeeDetails).then(response => {
      if (response.ok) {
        return response.json()
      }
    }).then(data => {
      switch (data.gender) {
        case "M":
          imageUrl += `men/${imageIndex}.jpg`
          break;
        case "F":
          imageUrl += `women/${imageIndex}.jpg`
          break;
      }
      const employee = Object.assign({}, data, { imageUrl })
      setEmployee(employee)
    }).catch(err => { })
  }, [])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div className="avatar-wrapper">
        <Avatar {...stringAvatar('Georgi Facello')} />
      </div>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Myself" {...a11yProps(0)} />
            <Tab label="My Team" disabled {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <EmployeeCard employee={employee} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        
      </Box>
      <Box>
        <Upload></Upload>
        <List></List>
      </Box>

    </>
  );
}