import { combineReducers } from 'redux';

import jobs from './jobs';
import auth from './Auth'

export const reducers = combineReducers({ jobs, auth });