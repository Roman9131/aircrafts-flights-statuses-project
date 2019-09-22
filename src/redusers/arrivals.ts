import { Reducer } from 'redux';

import * as types from '../constants';
import { IDataModel, FlightStatuses } from "../@types";

export interface IArrivalsListState {
  data: IDataModel | {};
  flightArrivalsList: FlightStatuses[];
  isLoading: boolean;
  error: boolean;
}

const defaultState: IArrivalsListState = {
  data: {},
  flightArrivalsList: [],
  isLoading: false,
  error: false,
};

export const arrivalsList: Reducer<IArrivalsListState> = (state = defaultState, action) => {
  switch (action.type) {
    case types.ASYNC_GET_ARRIVALS_LIST:
      return {
        ...state,
        isLoading: true,
        data: {},
        flightArrivalsList: [],
        error: false,
      };
    case types.ASYNC_GET_ARRIVALS_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.data,
        flightArrivalsList: action.data.flightStatuses,
      };
    case types.ASYNC_GET_ARRIVALS_LIST_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
