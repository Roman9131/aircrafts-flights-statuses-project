import { Reducer } from 'redux';

import * as types from '../constants';
import { IDataModel, FlightStatuses } from "../@types";

export interface IDepurtureListState {
  data: IDataModel | {};
  flightDeparturesList: FlightStatuses[];
  isLoading: boolean;
  error: boolean;
}

const defaultState: IDepurtureListState = {
  data: {},
  flightDeparturesList: [],
  isLoading: false,
  error: false,
};

export const departureList: Reducer<IDepurtureListState> = (state = defaultState, action) => {
  switch (action.type) {
    case types.ASYNC_GET_DEPARTURES_LIST:
      return {
        ...state,
        data: {},
        flightDeparturesList: [],
      };
    case types.TOGGLE_DEPARTURES_LOADING:
      return {
        ...state,
        isLoading: !state.isLoading,
      };
    case types.ASYNC_GET_DEPARTURES_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.data,
        flightDeparturesList: action.data.flightStatuses,
      };
    case types.ASYNC_GET_DEPARTURES_LIST_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
