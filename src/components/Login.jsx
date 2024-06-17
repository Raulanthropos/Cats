import { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Controller } from "react-hook-form";
import { setUserInfo } from "../redux/actions/CatAction";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import { styled } from "@mui/material/styles";
import { Alert } from "@mui/material";
import Logged from "./Logged";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FormHelperText } from "@mui/material";
import { PASSWORD_PATTERN } from "../ui/Password";
import CircularProgress from "@mui/material/CircularProgress";

const useStyles = styled((theme) => ({
  image: {
    width: "75%",
    height: "75%",
  },
}));

const LoginComponent = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.currentUser);
  // const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // const handleClose = (event) => {
  //   setOpen(false);
  // };

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const submission = (data) => {
    if (
      data.username.includes("@") &&
      data.password.length >= 6 &&
      (data.username.endsWith(".com") || data.username.endsWith(".org"))
    ) {
      setLoading(true);
      setTimeout(() => {
        dispatch(
          setUserInfo({ email: data.username, password: data.password })
        );
        navigate("/logged");
      }, 3000);
    } else if (
      !data.username.includes("@") ||
      !(data.username.endsWith(".com") || data.username.endsWith(".org"))
    ) {
      setError("username", {
        message: "Please enter a valid email address.",
      });
    } else if (data.password.length < 6) {
      console.log("Pass length", data?.password?.length);
      setError("password", {
        message: "Password must be at least 6 characters long",
      });
    }
  };

  return (
    !user && (
      <Container maxWidth="lg" className="p-5 my-5">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              height="100%"
            >
              <img
                src="https://images.unsplash.com/photo-1571566882372-1598d88abd90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                alt="cat"
                className={classes.image}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              height="100%"
            >
              <form onSubmit={handleSubmit(submission)} className="w-100">
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  {...register("username", {
                    required: true,
                    // validate: (value) =>
                    //   value.includes("@") ||
                    //   value.endsWith(".com") ||
                    //   value.endsWith(".org"),
                    //  || "Please enter a valid email address.",
                  })}
                  error={!!errors?.username}
                  helperText={errors.username?.message}
                />
                <TextField
                  label="Password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  type="password"
                  {...register("password", { required: true })}
                  error={!!errors?.password}
                  helperText={errors.password?.message}
                />
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  type="submit"
                >
                  {loading ? (
                    <CircularProgress size={24} sx={{ color: "white" }} />
                  ) : (
                    <span>Login</span>
                  )}
                </Button>
              </form>
            </Box>
          </Grid>
        </Grid>
        {/* <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          This is a success message!
        </Alert>
      </Snackbar> */}
      </Container>
    )
  );
  // : (
  //   !loading && <CircularProgress />
  // );
};

export default LoginComponent;

// const LoginComponent = () => {
//   const classes = useStyles();
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [emailError, setEmailError] = useState(false);
//   const [passwordError, setPasswordError] = useState(false);
//   const [open, setOpen] = useState(false);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const user = useSelector((state) => state.user.currentUser);

//   const handleClose = (event) => {
//     // if (reason === 'clickaway') {
//     //   return;
//     // }

//     setOpen(false);
//   };
//   const handleUsername = (event) => {
//     setUsername(event.target.value);
//     setEmailError(false);
//   };

//   const handlePassword = (event) => {
//     setPassword(event.target.value);
//     setPasswordError(false);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     if (
//       username.includes("@") &&
//       password.length >= 6 &&
//       username.endsWith(".com" || username.endsWith(".org"))
//     ) {
//       dispatch(setUserInfo({ email: username, password }));
//       setOpen(true);
//     } else {
//       if (
//         !username.includes("@") ||
//         !username.endsWith(".com" || !username.endsWith(".org"))
//       ) {
//         setEmailError(true);
//       }
//       if (password.length < 6) {
//         setPasswordError(true);
//       }
//     }
//   };

//   return !user ? (
//     <Container maxWidth="lg" className="p-5 my-5">
//       <Grid container spacing={3}>
//         <Grid item xs={12} sm={6}>
//           <Box
//             display="flex"
//             alignItems="center"
//             justifyContent="center"
//             height="100%"
//           >
//             <img
//               src="https://images.unsplash.com/photo-1571566882372-1598d88abd90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
//               alt="cat"
//               className={classes.image}
//             />
//           </Box>
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <Box
//             display="flex"
//             alignItems="center"
//             justifyContent="center"
//             height="100%"
//           >
//             <form
//               onSubmit={(event) => handleSubmit(event, username)}
//               className="w-100"
//             >
//               <TextField
//                 label="Email"
//                 variant="outlined"
//                 fullWidth
//                 margin="normal"
//                 value={username}
//                 onChange={handleUsername}
//                 error={emailError}
//                 helperText={emailError ? "Wrong email input" : ""}
//               />

//               <TextField
//                 label="Password"
//                 variant="outlined"
//                 fullWidth
//                 margin="normal"
//                 type="password"
//                 value={password}
//                 onChange={handlePassword}
//                 error={passwordError}
//                 helperText={
//                   passwordError ? "Not enough characters, please try again." : ""
//                 }
//               />
//               {/* {errorMessage && <Typography className="text-danger mb-3">{errorMessage}</Typography>} */}
//               <Button
//                 variant="contained"
//                 color="primary"
//                 size="large"
//                 fullWidth
//                 type="submit"
//               >
//                 Login
//               </Button>
//             </form>
//           </Box>
//         </Grid>
//       </Grid>
//       <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
//         <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
//           This is a success message!
//         </Alert>
//       </Snackbar>
//     </Container>
//   ) : (
//     navigate("/logged")
//   );
// };

// export default LoginComponent;
