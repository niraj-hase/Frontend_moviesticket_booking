import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { HomePage, AdminPage } from "./Pages";
import { Register, Login, MovieList, AddScreen, Navbar } from "./components";

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/add-screen" element={<AddScreen />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/movies" element={<MovieList />} />
          {/* <Route path="/seat-selection" element={<SeatSelection />} /> */}
          {/* Add more routes as needed */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
