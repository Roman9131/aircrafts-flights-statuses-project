import { call, put } from 'redux-saga/effects';

import * as actions from '../actions';
import { axiosGetArrivalsList } from '../api';

export default function* fetchArrivalsList() {
  try {
    const res = yield call(axiosGetArrivalsList);
    if (res.data) {
      yield put(actions.setDictionaries(res.data));
      yield put(actions.asyncGetArrivalsSuccess(res.data));
    }
  } catch (error) {
    yield put(actions.asyncGetArrivalsError(error));
  }
}
