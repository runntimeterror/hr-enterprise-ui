import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const FUTURE_DATE = `9999-01-01`

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const currencyFormat = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

export default function EmployeeCard(props) {
  const [expanded, setExpanded] = React.useState(false);
  const { employee } = props
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} src={employee.imageUrl}>
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={`${employee.firstName} ${employee.lastName}`}
        subheader={`${employee.currentTitle}`}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Employee Number: {employee.employeeNumber}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Dept: {employee.currentDepartmentName}
        </Typography>{employee.manager ?
          <Typography variant="body2">
            Reports to: {employee.manager.firstName} {employee.manager.lastName}
          </Typography> : null}
      </CardContent>
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="body2">Current Salary: {currencyFormat.format(employee.currentSalary)}</Typography>
          {
            employee.salaries && employee.salaries.length > 0 && 
            <Typography variant="body2">
              Previous Salaries:
              {employee.salaries.map((sal => {
                return <Typography sx={{ fontSize: 12 }} color="text.secondary">
                  {currencyFormat.format(sal.salary)}&nbsp;
                  {sal.fromDate} - {sal.toDate === FUTURE_DATE ? 'Current' : sal.toDate}
                </Typography>
              }))}
            </Typography>
          }
        </CardContent>
      </Collapse>
    </Card>
  );
}