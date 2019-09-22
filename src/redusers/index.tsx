import { combineReducers } from 'redux';

import { departureList, IDepurtureListState } from './departures';
import { arrivalsList, IArrivalsListState } from './arrivals';
import { dictionaries, IDictionariesState } from './dictionaries';

// The top-level redux state
export interface IStore {
  departureList: IDepurtureListState;
  arrivalsList: IArrivalsListState;
  dictionaries: IDictionariesState;
}

const reducers = combineReducers<IStore>({arrivalsList, departureList, dictionaries });

export default reducers;
