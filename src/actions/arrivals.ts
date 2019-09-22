import { Action, AnyAction } from 'redux';
import { IDataModel } from '../@types';

import * as types from '../constants';

export interface IArrivalsAction extends Action {
  data: IDataModel;
}

export interface IAsyncGetArrivalsList { (): Action; }
export interface IAsyncGetArrivalsError { (error: boolean): AnyAction; }
export interface IAsyncGetArrivalsSuccess { (list: IDataModel): IArrivalsAction; }

export const asyncGetArrivalsList: IAsyncGetArrivalsList = () => ({
  type: types.ASYNC_GET_ARRIVALS_LIST,
});

export const asyncGetArrivalsSuccess: IAsyncGetArrivalsSuccess = (data) => ({
  type: types.ASYNC_GET_ARRIVALS_LIST_SUCCESS,
  data,
});

export const asyncGetArrivalsError: IAsyncGetArrivalsError = (error) => ({
  type: types.ASYNC_GET_ARRIVALS_LIST_ERROR,
  error,
});
