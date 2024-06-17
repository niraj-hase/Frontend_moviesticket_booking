// src/components/ShowTimes.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const ShowTimes = () => {
  const [showTimes, setShowTimes] = useState([]);

  useEffect(() => {
    const fetchShowTimes = async () => {
      try {
        const response = await axios.get("/admin/show-details");
        setShowTimes(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching showtimes", error);
      }
    };

    fetchShowTimes();
  }, []);

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Showtimes
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Movie</TableCell>
              <TableCell>Screen</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Start Time</TableCell>
              <TableCell>End Time</TableCell>
              <TableCell>Available Seats</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {showTimes.map((showTime) => (
              <TableRow key={showTime._id}>
                <TableCell>{showTime.movie.title}</TableCell>
                <TableCell>{showTime.screen.name}</TableCell>
                <TableCell>
                  {new Date(showTime.date).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {new Date(showTime.startTime).toLocaleTimeString()}
                </TableCell>
                <TableCell>
                  {new Date(showTime.endTime).toLocaleTimeString()}
                </TableCell>
                <TableCell>{showTime.availableSeats.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ShowTimes;
