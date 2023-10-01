import React, { useState, useEffect } from "react";
import {
  Grid,
  Button,
  TextField,
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createJob } from "../actions/blogs";
import FileBase64 from "react-file-base64";
import { useNavigate } from "react-router-dom";


const Dashboard = () => {
  const Navigate = useNavigate()
  const dispatch = useDispatch();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [fileBase64, setFileBase64] = useState("");
  const [fileBase64Video, setFileBase64Video] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    tagline: "",
    selectedFile:'',
    selectedVideoFile:'',
    about: "",
    user: user?.result?._id
  });

  const handleUploadForm = (event) => {
    dispatch(createJob(formData));
    Navigate('/');
  };

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, []);


  return (
    <>
      {user && (
        <div
          style={{
            margin: "20px",
            marginTop: "40px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            component="form"
            noValidate
            onSubmit={handleUploadForm}
            sx={{
              m: 6,
              width: "50%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="Title"
                  required
                  fullWidth
                  id="title"
                  label="Title"
                  autoFocus
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="tagline"
                  label="tagline"
                  name="tagline"
                  value={formData.companyName}
                  onChange={(e) =>
                    setFormData({ ...formData, tagline: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                Upload Image &nbsp;&nbsp;
                <FileBase64
                  type="file"
                  multiple={false}
                  onDone={({ base64 }) => {
                    setFormData({ ...formData, selectedFile: base64 });
                    setFileBase64(base64);
                  }}
                />
                <br /> <br />
                {fileBase64 && <img src={fileBase64} alt="Uploaded" style={{width:'200px'}}/>}
                <br />
                {fileBase64 && 
                
                  <Button
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: "red" }}
              onClick={() => setFileBase64('')}
            >
              Clear
            </Button>}
                
              </Grid>

              <Grid item xs={12} sm={6}>
                Upload Video &nbsp;&nbsp;&nbsp;
                <FileBase64
                  type="file"
                  multiple={false}
                  onDone={({ base64 }) =>{
                    setFormData({ ...formData, selectedVideoFile: base64 });
                    setFileBase64Video(base64);
                    console.log(fileBase64Video)
                  }}
                /> <br /> <br />
                {fileBase64Video && (
                  <video width="400" controls style={{width:'400px'}}>
                    <source src={fileBase64Video} type="video/mp4" />
                  </video>
                )}
                <br />
                {fileBase64Video && 
                <Button
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: "red" }}
              onClick={() => setFileBase64Video('')}
            >
              Clear
            </Button>
                }
              </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="body"
                    label="body"
                    name="body"
                    multiline
                    rows={5}
                    value={formData.about}
                    onChange={(e) => setFormData({ ...formData,about : e.target.value })}
                  />
                </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: "#313866" }}
            >
              Upload
            </Button>
          </Box>
        </div>
      )}
    </>
  );
};

export default Dashboard;
