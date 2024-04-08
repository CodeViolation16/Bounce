import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
const columns = [
  { field: "id", headerName: "ID", width: 150 },
  {
    field: "username",
    headerName: "Email",
    type: "text",
    width: 250,
  },
  { field: "name", headerName: "Name", width: 150 },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

export default function DataTable() {
  useEffect(() => {
    // Fetch all users when component mounts
    fetch("http://localhost:3002/users/all")
      .then((res) => res.json())
      .then((data) => {
        // Update the users state with the fetched data
        console.log(data);
        data.forEach((user) => console.log(user._id));
        const filteredUsers = data.filter((user) => !user.delete);
        setUsers(filteredUsers);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []); // Empty dependency array to run the effect only once on component mount
  const [users, setUsers] = useState([]);
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={users}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}
