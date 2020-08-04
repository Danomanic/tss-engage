import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from '../Title';

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(0, '16 Mar, 2021', '1st Haughton Green', 'Cubs', 'Daniel Pomfret', 'Camp'),
  createData(1, '16 Mar, 2021', '1st Haughton Green', 'Cubs', 'Daniel Pomfret', 'Camp'),
  createData(2, '16 Mar, 2021', '1st Haughton Green', 'Cubs', 'Daniel Pomfret', 'Camp'),
  createData(3, '16 Mar, 2021', '1st Haughton Green', 'Cubs', 'Daniel Pomfret', 'Camp'),
  createData(4, '16 Mar, 2021', '1st Haughton Green', 'Cubs', 'Daniel Pomfret', 'Camp')
]

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Activities() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Recent Activities</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Group</TableCell>
            <TableCell>Section</TableCell>
            <TableCell>Leader</TableCell>
            <TableCell align="right">Type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.shipTo}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more activities
        </Link>
      </div>
    </React.Fragment>
  );
}