//actions>jobs.js
import { FETCH_ALL, CREATE, DELETE, FETCH_BY_SEARCH, FETCH_JOB } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getJobs = () => async (dispatch) => {
  try {
    const { data } = await api.fetchBlogs();

    dispatch({ type: FETCH_ALL, payload: data });

  } catch (error) {
    console.log(error.message);
  }
};

export const fetchJob = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchBlog(id);

    dispatch({ type: FETCH_JOB, payload: data });

  } catch (error) {
    console.log(error);
  }
};


export const createJob = (Job) => async (dispatch) => {
  try {
    const { data } = await api.createBlog(Job);

    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};


export const fetchJobsBySearch = (searchQuery) => async(dispatch) => {
    try {
        const {data} = await api.fetchBlogsBySearch(searchQuery)
        dispatch({
            type : FETCH_BY_SEARCH,
            payload:data
        });
        // console.log("<---->",data);

    } catch (error) {
        console.log(error);
    }
}

export const deleteJob = (id) => async (dispatch) => {
  try {
    await api.deleteJob(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error.message);
  }
};