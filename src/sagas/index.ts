import { takeEvery, all } from 'redux-saga/effects';

import * as types from '../constants';
import fetchArrivalsList from './arrivals';
import fetchDeparturesList from './departures';

export default function* rootSaga() {
  yield all([
    takeEvery( types.ASYNC_GET_DEPARTURES_LIST, fetchDeparturesList),
    takeEvery( types.ASYNC_GET_ARRIVALS_LIST, fetchArrivalsList),
  ]);
}
