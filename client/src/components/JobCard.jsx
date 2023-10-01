import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box
} from "@mui/material";
import CardMedia from '@mui/material/CardMedia';
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteJob } from "../actions/blogs";

const JobCard = ({ prop, setCurrentId, currentId, delButton, appliedjob, user }) => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOpen = () => {
    setCurrentId(prop._id);
    Navigate(`/jobs/${prop._id}`);
  };

  const handleDelete = () => {
    console.log("--->",prop?._id);
    setCurrentId(prop?._id);
    dispatch(deleteJob(prop?._id));
    // window.location.reload();

  };

  return (
    <Grid item xs={12} sm={12} md={6} >

      <Card sx={{ display: 'flex', borderRadius:'10px', boxShadow:4, backgroundColor:'#FFE3E1',  }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', width:'100%' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
          {prop.title}
          </Typography>
          <Typography style={{color:'gray', fontSize:'15px'}}>{moment(prop.createdAt).fromNow()}</Typography>
          <br />
     
          <Typography variant="subtitle1"  component="div">
            {prop.tagline}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          <CardActions>
          {user && user?.result?._id === prop?.user ? (
  <Button size="small" onClick={handleDelete} sx={{ color: "red" }}>
    Delete
  </Button>
) : null}


            <Button size="small" onClick={handleOpen}>
              View
            </Button>
      
        </CardActions>
        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ maxWidth: 200, padding:2 , borderRadius:'25px', height:200}}
        image={prop.selectedFile || "blog.png"}
        alt="Live from space album cover"
      />
    </Card>
    </Grid>
  );
};

export default JobCard;
