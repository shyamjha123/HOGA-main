import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useSelector, useDispatch } from "react-redux";
import { getAllData } from "../redux/Profilelist";
import Avatar from "@mui/material/Avatar";
import { useNavigate,useLocation } from "react-router-dom";

const columns = [
  { id: "Image", label: "Image", minWidth: 170 },
  { id: "Username", label: "Username", minWidth: 100 },
  { id: "age", label: "Age", minWidth: 170, align: "right" },
  { id: "height", label: "Height", minWidth: 170, align: "right" },
  { id: "CasteSubcaste", label: "CasteSubcaste", minWidth: 170, align: "right" },
  { id: "Caste", label: "Caste", minWidth: 170, align: "right" },
  { id: "Country", label: "Country", minWidth: 170, align: "right" },
  { id: "State", label: "State", minWidth: 170, align: "right" },
  { id: "City", label: "City", minWidth: 170, align: "right" },
  { id: "Weight", label: "Weight", minWidth: 170, align: "right" },
  { id: "Smoke", label: "Smoke", minWidth: 170, align: "right" },
  { id: "Mothertongue", label: "Mothertongue", minWidth: 170, align: "right" },
  { id: "AnnualIncome", label: "Annual Income", minWidth: 170, align: "right" },
  { id: "Bloodgroup", label: "Bloodgroup", minWidth: 170, align: "right" },
  { id: "Diet", label: "Diet", minWidth: 170, align: "right" },
  { id: "bodytype", label: "Body Type", minWidth: 170, align: "right" },
  { id: "brothercontactno", label: "Brother Contact No", minWidth: 170, align: "right" },
  { id: "brothermaritalstatus", label: "Brother Marital Status", minWidth: 170, align: "right" },
  { id: "business", label: "Business", minWidth: 170, align: "right" },
];

function Adminpages() {
  const navigate = useNavigate();
  const datastore = useSelector((state) => state.Profiledata.users);
  console.log('====================================');
  console.log(datastore);
  console.log('====================================');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllData());
  }, [dispatch]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const createData = (user) => {
    const parsedDate = new Date(user.dateOfBirth);

    const userData = {
      id: user.id, // Add id property
      Image: (

        user.imagePath && user.imagePath[0] && (
        
        <Avatar
          alt="User Avatar"
          src={user.imagePath[0]}
          sx={{ width: 60, height: 60 }}
        />
        )

      ),
      Username: user.name,
      age: user.age,
      height: user.height,
      CasteSubcaste: user.casteSubcaste,
      Caste: user.caste,
      Country: user.country,
      State: user.state,
      City: user.city,
      Weight: user.weight,
      Smoke: user.smoke,
      Mothertongue: user.mothertongue,
      AnnualIncome: user.annualIncome,
      Bloodgroup: user.bloodgroup,
      Diet: user.diet,
      bodytype: user.bodytype,
      brothercontactno: user.brothercontactno,
      brothermaritalstatus: user.brothermaritalstatus,
      business: user.business,
      month: parsedDate.getMonth(),
      year: parsedDate.getFullYear()
    };

    return userData;
  };

  const sortedRows = [...datastore]
    .map((user) => createData(user))
    .sort((a, b) => {
      if (a.year !== b.year) {
        return a.year - b.year;
      }
      return a.month - b.month;
    });

    const handleRowClick = (user) => {
      console.log("Clicked User:", user);
      const selectedUser = datastore.find(u => u.id === user.id);
      console.log("Selected User:", selectedUser);
      navigate('/Userprofilesdetails', { state: { selectedUser } });
    };
    


    console.log(datastore, 'MADAR');

  const rows = sortedRows;
  return (
    <Paper style={{ width: "100%", overflow: "hidden" }}>
      <TableContainer style={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, rowIndex) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={rowIndex}    onClick={() => handleRowClick(row)} >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default Adminpages;
