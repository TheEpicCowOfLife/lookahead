import {
  GET_SUBJECT_BEGIN,
  GET_SUBJECT_SUCCESS,
  GET_SUBJECT_FAILURE,
  REMOVE_SUBJECT,
  CHANGE_SUBJECT_COLOR,
} from '../actionTypes';
import axios from 'axios';

const getSubjectBegin = (year, code, name, online) => ({
  type: GET_SUBJECT_BEGIN,
  payload: {year, code, name, online},
});

const getSubjectSuccess = (year, code, name, online, studyPeriod, classInfo) => ({
  type: GET_SUBJECT_SUCCESS,
  payload: {year, code, name, online, studyPeriod, classInfo},
});

const getSubjectFailure = (code, error) => ({
  type: GET_SUBJECT_FAILURE,
  payload: {code, error},
});

export const getSubject = (year, studyPeriod, code, name, online) => dispatch => {
  dispatch(getSubjectBegin(year, code, name, online, studyPeriod));
  const listURL = `/subject?year=${year}&period=${studyPeriod}&code=${code}`;
  return axios
    .get(listURL)
    .then(res => dispatch(getSubjectSuccess(year, code, name, online, studyPeriod, res.data)))
    .catch(err => dispatch(getSubjectFailure(code, err)));
};

export const changeSubjectColor = (year, studyPeriod, code, color) => dispatch => {
  dispatch({
    type: CHANGE_SUBJECT_COLOR,
    payload: {year, code, studyPeriod, color},
  });
};

export const removeSubject = code => ({
  type: REMOVE_SUBJECT,
  payload: {code},
});
