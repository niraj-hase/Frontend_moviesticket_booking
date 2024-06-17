import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { AddScreen, AddShowTime, AddMovie } from "../components";

const AdminPage = () => {
  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Admin Dashboard
      </Typography>
      <List>
        <ListItem button component={Link} to="/admin/add-screen">
          <ListItemText primary="Add Screen" />
        </ListItem>
        <ListItem button component={Link} to="/admin/add-showtime">
          <ListItemText primary="Add Showtime" />
        </ListItem>
        {/* Add more links for other admin functionalities */}
      </List>
      <div className="component-container">
        <AddScreen />
        {/* <AddScreen /> */}
        <AddShowTime />
        <AddMovie />
      </div>
    </Container>
  );
};

export default AdminPage;
