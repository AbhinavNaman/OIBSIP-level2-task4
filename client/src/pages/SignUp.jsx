import React,{useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {signup} from '../actions/auth'


export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name:'', email:'', password:''
  })

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    dispatch(signup(formData, navigate))
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (

      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >

          <Typography component="h1" variant="h5">
            Sign up
          </Typography>

          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} >
                <TextField
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  onChange={handleChange}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  onChange={handleChange}
                  name="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  onChange={handleChange}
                  id="password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor:'#08A045' }}
            >
              Sign Up
            </Button>
          
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Button>
                <Link to='/login'>
                  Sign in
                </Link>
                </Button>
              </Grid>
            </Grid>

          </Box>
        </Box>
      </Container>

  );
}