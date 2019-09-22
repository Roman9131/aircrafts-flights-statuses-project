import { Action } from 'redux';
import { IDataModel } from '../@types';

import * as types from '../constants';

export interface IDataAction extends Action {
  data: IDataModel;
}

export interface ISetDictionaries { (list: IDataModel): IDataAction; }

export const setDictionaries: ISetDictionaries = (data) => ({
  type: types.SET_DICTIONARIES,
  data,
});
