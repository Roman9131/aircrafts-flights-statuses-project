import { Action, AnyAction } from 'redux';
import { IDataModel } from "../@types";

import * as types from '../constants';

export interface IDeparturesAction extends Action {
  data: IDataModel;
}

export interface IAsyncGetDeparturesList { (): Action; }
export interface IAsyncGetDeparturesError { (error: boolean): AnyAction; }
export interface IAsyncGetDeparturesSuccess { (list: IDataModel): IDeparturesAction; }

export const asyncGetDeparturesList: IAsyncGetDeparturesList = () => ({
  type: types.ASYNC_GET_DEPARTURES_LIST,
});

export const asyncGetDeparturesSuccess: IAsyncGetDeparturesSuccess = data => ({
  type: types.ASYNC_GET_DEPARTURES_LIST_SUCCESS,
  data,
});

export const asyncGetDeparturesError: IAsyncGetDeparturesError = error => ({
  type: types.ASYNC_GET_DEPARTURES_LIST_ERROR,
  error,
});
