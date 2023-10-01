import React, {useState, useEffect} from "react";
import { Button, Grid, Typography, Container, Input, Box, Stack} from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom"
import {getJobs, fetchJobsBySearch} from "../actions/blogs"

import { useDispatch , useSelector} from "react-redux";
import JobCard from "../components/jobCard";
const InputCSS = {
  padding: "5px",
  width: "600px",

}


export default function Home() {
  const {jobs} = useSelector((state) => state.jobs);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));


  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  
  useEffect(()=>{
    dispatch(getJobs());
  },[dispatch])

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('profile')));
  }, []);

   const [searchWhat, setSearchWhat] = useState("");
  const handleSearch = async () => {
    if (searchWhat) {
      await dispatch(fetchJobsBySearch(searchWhat));
      Navigate(`/jobs/search?searchQuery=${searchWhat || "none"}`);
    } else {
      Navigate("/joblist");
    }
  };
  const handleGoBack = async () => {
    Navigate("/");
    // Reload the current window
    window.location.reload();
  };
  return (


      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: '##fffaef',
            pt: 6,
            pb: 0,
          }}
        >
          <Container maxWidth="lg" style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Upload anything Anonymous
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
            Let's see what people have to say without knowing who said what
            </Typography>


            {user && (
              <div>
             <Input
            placeholder="&nbsp; Search…"
            style={InputCSS}
            value={searchWhat}
            onChange={(e) => setSearchWhat(e.target.value)}
          />
          &nbsp;&nbsp; &nbsp;
          <Button
            type="submit"
            color="inherit"
            variant="outlined"
            onClick={handleSearch}
          >
            Search
          </Button>
          &nbsp;
          {searchWhat && (
            <Button color="inherit" variant="outlined" onClick={handleGoBack}>
              Go Back
            </Button>
          )}
          </div>
            )}


          </Container>
        </Box>


       
{user ? (
  <Container sx={{ py: 8, }} maxWidth="lg">

          <Grid container spacing={8}>
 
          {jobs.map((job) => 
          <JobCard key={job._id} prop={job} setCurrentId={setCurrentId} currentId={currentId} delButton={false} user={user}/>
         )}
          </Grid>
        </Container>
): (
  <Container sx={{ py: 8, }} maxWidth="lg">
  <Typography>

          signin to see posts
  </Typography>

        </Container>
)}
          

        
      </main>
  );
}