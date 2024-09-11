import { useEffect, useState } from "react";
import "./AdminFr.css";
import styled from "styled-components";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function AdminFr() {
  const [users, setUsers] = useState([]);
  const [firstOpen, setFirstOpen] = useState();
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/users/all`)
      .then((res) => res.json())
      .then((data) => {
        const filteredUsers = data.filter((user) => !user.delete);
        setUsers(filteredUsers);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const handleSoftDelete = async (userId) => {
    console.log(userId);

    try {
      const res = await fetch(
        `http://localhost:3002/users/${userId}/soft-delete`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ delete: true }),
        }
      );
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.error("Error soft deleting user:", error);
    }
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = (userId) => {
    setOpen(true);
    setUserIdToDelete(userId);
    console.log(userId);
  };
  const handleClose = () => {
    setOpen(false);
    setUserIdToDelete(null);
  };
  const [announcement, setAnnouncement] = useState("");

  const handleChange = (event) => {
    setAnnouncement(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setAnnouncement(announcement);
    setAnnouncement("");
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/users/send`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: announcement,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StyledDiv>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>ID</th>
            <th>Deletion</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user._id}</td>
              <td>
                <Button onClick={() => handleOpen(user._id)}>Delete</Button>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                    >
                      You Sure Want To Delete?
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      <button
                        onClick={() => {
                          handleSoftDelete(userIdToDelete);
                          handleClose();
                        }}
                      >
                        Yes
                      </button>
                    </Typography>
                  </Box>
                </Modal>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="announce">Make an announcement</div>
          <input
            type="text"
            value={announcement}
            onChange={handleChange}
            placeholder="Type your announcement here"
            className="input"
          />
          <br />
          <button className="button" type="submit">
            Send
          </button>
        </form>
      </div>
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  .container {
    margin-top: 30px;
    margin-left: 30px;
  }
  .input {
    width: 500px;
    height: 5 0px;
  }
  .announce {
    padding-bottom: 10px;
  }
  .button {
    margin-top: 30px;

    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

export default AdminFr;
