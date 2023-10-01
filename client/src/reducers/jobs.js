//reducers>jobs.js
import { FETCH_ALL, CREATE, FETCH_BY_SEARCH, FETCH_JOB} from '../constants/actionTypes';

export default (state= {jobs: [], job:[] }, action) => {

  switch (action.type) {

    case FETCH_ALL:
      return {...state, jobs: action.payload};

    case FETCH_JOB:
      return {...state, job:action.payload};

    case CREATE:
      return {...state, jobs: [...state.jobs, action.payload]};

    case FETCH_BY_SEARCH:
      return {...state, jobs :action.payload};

    default:
      return state;
  }
};
