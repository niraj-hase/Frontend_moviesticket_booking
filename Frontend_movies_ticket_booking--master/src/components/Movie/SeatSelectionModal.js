import React, { useState, useEffect } from "react";
import { Box, Modal, Button, Typography, Grid, Paper } from "@mui/material";
import axios from "axios";

const SeatSelectionModal = ({
  open,
  handleClose,
  numTickets,
  handleConfirmSeats,
  showTimeId,
}) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [availableSeats, setAvailableSeats] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (open && showTimeId) {
      axios
        .get(`http://localhost:8000/sets/sets_availability/${showTimeId}`)
        .then((response) => {
          console.log("Fetched seats:", response.data.seats);
          setAvailableSeats(response.data.seats);
          setError(null);
        })
        .catch((err) => {
          console.error("Error fetching available seats:", err);
          setError("Error fetching available seats. Please try again later.");
        });
    }
  }, [open, showTimeId]);

  const handleSeatToggle = (seatId) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((id) => id !== seatId));
    } else {
      if (selectedSeats.length < numTickets) {
        setSelectedSeats([...selectedSeats, seatId]);
      }
    }
  };

  const handleConfirm = () => {
    handleConfirmSeats(selectedSeats);
    handleClose();
  };

  const getSeatColor = (seatId) => {
    const seat = availableSeats.find((seat) => seat._id === seatId);
    if (!seat || !seat.isAvailable) {
      return "red";
    }
    if (selectedSeats.includes(seatId)) {
      return "green";
    }
    return "gray";
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Select Seats
        </Typography>
        {error ? (
          <Typography variant="body1" color="error">
            {error}
          </Typography>
        ) : (
          <Grid container spacing={1}>
            {availableSeats.map((seat) => (
              <Grid item key={seat._id} xs={2}>
                <Paper
                  sx={{
                    width: 50,
                    height: 50,
                    bgcolor: getSeatColor(seat._id),
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: seat.isAvailable ? "pointer" : "not-allowed",
                    border: "1px solid #ccc",
                    borderRadius: 5,
                  }}
                  onClick={() => seat.isAvailable && handleSeatToggle(seat._id)}
                >
                  <Typography variant="body2">{seat.seatNumber}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="primary">
            Confirm Seats
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default SeatSelectionModal;
