import { call, put } from 'redux-saga/effects';

import * as actions from '../actions';
import { axiosGetDeparturesList } from '../api';

export default function* fetchDeparturesList() {


  try {
    const res = yield call(axiosGetDeparturesList);

    if (res.data) {
      yield put(actions.setDictionaries(res.data));
      yield put(actions.asyncGetDeparturesSuccess(res.data));
    }
  } catch (error) {
    yield put(actions.asyncGetDeparturesError(error));
  }
}
