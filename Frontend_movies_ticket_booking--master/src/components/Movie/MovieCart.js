import React, { useEffect, useState } from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Modal,
  Box,
  TextField,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SeatSelectionModal from "./SeatSelectionModal";

const MovieCard = ({ movie }) => {
  const [showDetails, setShowDetails] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [showTime, setShowTime] = useState("");
  const [numTickets, setNumTickets] = useState(1);
  const [openSeatModal, setOpenSeatModal] = useState(false);
  const [availableSeats, setAvailableSeats] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShowDetails = async () => {
      if (movie.show_times && movie.show_times[0]) {
        try {
          const response = await axios.get(
            `http://localhost:8000/movie/showInfo/${movie.show_times[0]}`
          );
          setShowDetails(response.data.data);
          setAvailableSeats(response.data.data._id);
        } catch (err) {
          console.error("Error in fetching data:", err);
        }
      }
    };

    fetchShowDetails();
  }, [movie.show_times]);

  console.log("showsDetails::::", showDetails);
  console.log("availableSeats", availableSeats);

  const handleBuyTickets = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setShowTime("");
    setNumTickets(1);
  };

  const handleProceed = () => {
    setOpenModal(false);
    setOpenSeatModal(true);
  };

  const handleConfirmSeats = (selectedSeats) => {
    localStorage.setItem("selectedShowTime", showTime);
    localStorage.setItem("numTickets", numTickets);
    localStorage.setItem("selectedSeats", JSON.stringify(selectedSeats));
    setOpenSeatModal(false);
    navigate("/seat-selection");
  };

  return (
    <Card>
      <CardActionArea onClick={handleBuyTickets}>
        <CardMedia
          component="img"
          height="300"
          image={movie.poster_url}
          alt={movie.title}
        />
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {movie.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Genres: {movie.genre.join(", ")}
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Show Times: {showDetails.startTime || "Not available"}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Ticket Price: ${movie.ticket_price}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => {
              e.stopPropagation();
              handleBuyTickets();
            }}
          >
            Buy Tickets
          </Button>
        </CardContent>
      </CardActionArea>

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Buy Tickets for {movie.title}
          </Typography>
          <TextField
            select
            label="Select Show Time"
            value={showTime}
            onChange={(e) => setShowTime(e.target.value)}
            fullWidth
            margin="normal"
          >
            <MenuItem key={showDetails.startTime} value={showDetails.startTime}>
              {showDetails.startTime}
            </MenuItem>
          </TextField>
          <TextField
            label="Number of Tickets"
            type="number"
            value={numTickets}
            onChange={(e) => setNumTickets(e.target.value)}
            fullWidth
            margin="normal"
            inputProps={{ min: 1 }}
          />
          <Box mt={2} display="flex" justifyContent="space-between">
            <Button onClick={handleCloseModal} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleProceed} color="primary">
              Proceed
            </Button>
          </Box>
        </Box>
      </Modal>

      <SeatSelectionModal
        open={openSeatModal}
        handleClose={() => setOpenSeatModal(false)}
        numTickets={numTickets}
        showTimeId={availableSeats}
        handleConfirmSeats={handleConfirmSeats}
      />
    </Card>
  );
};

export default MovieCard;
