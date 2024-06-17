import React, { useState } from "react";
import { Container, Typography, TextField, Button, Box } from "@mui/material";

import axiosInstance from "../../services/axiosConfig";

const AddScreen = () => {
  const [name, setName] = useState("");
  const [totalSeats, setTotalSeats] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/admin/add-screen", {
        name,
        totalSeats,
      });
      console.log(response.data);
      alert("Screen added successfully");
      setName("");
      setTotalSeats("");
    } catch (error) {
      console.error(error);
      alert("Error adding screen. Please try again.");
    }
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Add Screen
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <TextField
          label="Screen Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Total Seats"
          type="number"
          value={totalSeats}
          onChange={(e) => setTotalSeats(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          sx={{ mt: 2 }}
        >
          Add Screen
        </Button>
      </Box>
    </Container>
  );
};

export default AddScreen;
