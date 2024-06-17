import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography, Grid, CircularProgress } from "@mui/material";
import MovieCard from "./MovieCart";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8000/movie/movie_list")
      .then((response) => {
        setMovies(response.data.movieList);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
        setLoading(false);
      });
  }, []);

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Movie List
      </Typography>
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="50vh"
        >
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {movies.map((movie) => (
            <Grid item key={movie._id} xs={12} sm={6} md={4}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default MovieList;
