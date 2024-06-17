import React, { useState } from "react";
import axiosInstance from "../../services/axiosConfig";

import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

const genres = [
  "Action",
  "Comedy",
  "Drama",
  "Fantasy",
  "Horror",
  "Mystery",
  "Romance",
  "Thriller",
  "Sci-Fi",
];

const AddMovie = () => {
  const [posterUrl, setPosterUrl] = useState("");
  const [title, setTitle] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [ticketPrice, setTicketPrice] = useState("");

  const handleGenreChange = (event) => {
    setSelectedGenres(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const movieData = {
      poster_url: posterUrl,
      title: title,
      genre: selectedGenres,
      ticket_price: parseFloat(ticketPrice),
    };

    try {
      const response = await axiosInstance.post("/admin/add-movie", movieData);
      console.log(response.data);
      // Handle successful response, e.g., show a success message or reset form
    } catch (error) {
      console.error("Error adding movie:", error);
      // Handle error, e.g., show an error message
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Add Movie
        </Typography>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Poster URL"
              value={posterUrl}
              onChange={(e) => setPosterUrl(e.target.value)}
              required
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel id="genre-select-label">Genre</InputLabel>
            <Select
              labelId="genre-select-label"
              multiple
              value={selectedGenres}
              onChange={handleGenreChange}
              required
            >
              {genres.map((genre) => (
                <MenuItem key={genre} value={genre}>
                  {genre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Ticket Price"
              type="number"
              value={ticketPrice}
              onChange={(e) => setTicketPrice(e.target.value)}
              required
            />
          </FormControl>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Add Movie
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default AddMovie;
