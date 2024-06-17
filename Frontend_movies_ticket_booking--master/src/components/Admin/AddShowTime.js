import React, { useState, useEffect } from "react";
import axiosInstance from "../../services/axiosConfig";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Alert,
} from "@mui/material";

const availableTimes = [
  { label: "10:00 to 13:00", start: "10:00", end: "13:00" },
  { label: "13:30 to 16:30", start: "13:30", end: "16:30" },
  { label: "17:00 to 21:00", start: "17:00", end: "21:00" },
  { label: "22:30 to 01:30", start: "22:30", end: "01:30" },
];

const AddShowTime = () => {
  const [movies, setMovies] = useState([]);
  const [screens, setScreens] = useState([]);
  const [movieId, setMovieId] = useState("");
  const [screenId, setScreenId] = useState("");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [responseType, setResponseType] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("api called");
        const movieResponse = await axiosInstance.get("/admin/movie_list");
        const screenResponse = await axiosInstance.get("admin/get-screen");
        setMovies(movieResponse.data.movies_list);
        setScreens(screenResponse.data.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedTimeSlot = availableTimes.find(
      (slot) => slot.label === timeSlot
    );
    const { start, end } = selectedTimeSlot;

    try {
      const response = await axiosInstance.post("/admin/add-show", {
        movieId,
        screenId,
        date,
        startTime: start,
        endTime: end,
      });
      setResponseType("success");
      setResponseMessage("Showtime added successfully");
      // Clear the form
      setMovieId("");
      setScreenId("");
      setDate("");
      setTimeSlot("");
    } catch (error) {
      setResponseType("error");
      setResponseMessage(
        error.response?.data?.message || "Error adding showtime"
      );
      console.error(error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Add Showtime
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <FormControl fullWidth margin="normal">
          <InputLabel>Movie</InputLabel>
          <Select
            value={movieId}
            onChange={(e) => setMovieId(e.target.value)}
            required
          >
            {movies.map((movie) => (
              <MenuItem key={movie._id} value={movie._id}>
                {movie.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Screen</InputLabel>
          <Select
            value={screenId}
            onChange={(e) => setScreenId(e.target.value)}
            required
          >
            {screens.map((screen) => (
              <MenuItem key={screen._id} value={screen._id}>
                {screen.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Time Slot</InputLabel>
          <Select
            value={timeSlot}
            onChange={(e) => setTimeSlot(e.target.value)}
            required
          >
            {availableTimes.map((slot) => (
              <MenuItem key={slot.label} value={slot.label}>
                {slot.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          sx={{ mt: 2 }}
        >
          Add Showtime
        </Button>
      </Box>
      {responseMessage && (
        <Alert severity={responseType} sx={{ mt: 2 }}>
          {responseMessage}
        </Alert>
      )}
    </Container>
  );
};

export default AddShowTime;
