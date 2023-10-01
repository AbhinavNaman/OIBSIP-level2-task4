import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button, Input } from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as actionType from "../constants/actionTypes";
import jwtDecode from "jwt-decode";

const linkCSS = {
  textDecoration: "none",
  color: "white",
  fontWeight: "400",
};

export default function Navbar() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const location = useLocation();


  const logout = () => {
    dispatch({ type: actionType.LOGOUT });
    Navigate("/");
    setUser(null);
    localStorage.removeItem("profile");
    window.location.reload();
  };

  const checkTokenExpiration = () => {
    const token = user?.token;

    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }
  };

  useEffect(() => {
    checkTokenExpiration();
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: " #FF9494" }}>
        <Toolbar>
          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color:'black', fontWeight:'800' }}>
          Anonyplix
          </Typography>
          {user && (
            <>
              <Button color="inherit">
                <Link to="/" exact >
                <img src="https://www.freepnglogos.com/uploads/logo-home-png/chimney-home-icon-transparent-1.png" style={{ width: "25px", height: "25px" }} />
                </Link>
              </Button>
              <Button color="inherit">
                <Link to="/dashboard" exact>
                <img src="https://www.pngplay.com/wp-content/uploads/8/Upload-Icon-Logo-PNG-Photos.png" style={{ width: "30px", height: "30px" }} />
                </Link>
              </Button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </>
          )}

          {!user && (
            <>
            <Link to='/login' exact style={{textDecoration:'none', color:'white'}}>Sign In</Link>

          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Link to='/signup' exact style={{textDecoration:'none', color:'white'}}>Sign Up</Link>
                </>
          )}

          
           
          
          &nbsp;
          {user && (
            <Button color="inherit" variant="outlined" onClick={logout}>
              LogOut
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
