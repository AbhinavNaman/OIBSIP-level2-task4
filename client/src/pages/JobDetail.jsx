import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Grid,
  Typography,
  TextField,
  Button,
  Link,
  Container,
} from "@mui/material";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchJob} from "../actions/blogs";

const JobDetail = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [userId, setUserId] = useState(user?.result._id);
  const [resumelink, setResumelink] = useState("");

  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const { job, jobs } = useSelector((state) => state.jobs);
  const [jobb, setJobb] = useState("");
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchJob(id));
  }, [id]);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
    if (user) {
      setUserId(user.result._id);
    }
    if (job) {
      setJobb(job?._id);
    }
    // console.log(user);
  }, [job]);

  if (!job) return null;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={2}
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid item xs={12} sm={12} md={12} lg={12}>
          {/* Job detail starting */}

          <Container
            sx={{
              alignItems: "center",
              justifyContent: "center",
              // margin:'2rem'
            }}
          >
          <br /><br />
            <Typography gutterBottom  variant="h2" component="h2">
              {job.title}
            </Typography>
            <Typography gutterBottom>
              Posted {moment(job.createdAt).fromNow()}
            </Typography>
            <hr />
            <br />

            <Typography gutterBottom>{job.tagline}</Typography>

            <Grid container spacing={2}>
              <Grid item xs={6} sm={6} md={6} lg={6}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <img
                      src={job.selectedFile || 'https://www.careerguide.com/career/wp-content/uploads/2021/07/Purpose-of-Blogging.jpeg'}
                      alt="Uploaded"
                      style={{ width: "500px" }}
                    />
                  </Grid>
                  {job.selectedVideoFile && (
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <video width="400" controls style={{ width: "500px" }}>
                      <source src={job.selectedVideoFile} type="video/mp4" />
                    </video>
                  </Grid>
                  )}
                </Grid>
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6}>
                <Typography>{job.about}</Typography>
              </Grid>
            </Grid>
          </Container>

          {/* Job detail ending */}
        </Grid>
      </Grid>
    </Box>
  );
};

export default JobDetail;
