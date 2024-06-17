import React from "react";
import { Button, TextField, Box, Typography } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login = () => {
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        axios
          .post("http://localhost:8000/user/login", values)
          .then((response) => {
            alert(response.data.message);
            console.log("Token:", response.data.token);
            console.log("User:", response.data.user);
            // Store the token in localStorage or context for use in other parts of the app
            localStorage.setItem("token", response.data.token);
            resetForm();
          })
          .catch((error) => {
            alert("Error: " + error.message);
          })
          .finally(() => {
            setSubmitting(false);
          });
      }}
    >
      {({ isSubmitting, errors, touched }) => (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="100vh"
        >
          <Typography variant="h4" gutterBottom>
            Login
          </Typography>
          <Form>
            <Box mb={2}>
              <Field
                as={TextField}
                name="email"
                label="Email"
                type="email"
                fullWidth
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
            </Box>
            <Box mb={2}>
              <Field
                as={TextField}
                name="password"
                label="Password"
                type="password"
                fullWidth
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />
            </Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={isSubmitting}
            >
              Login
            </Button>
          </Form>
        </Box>
      )}
    </Formik>
  );
};

export default Login;
