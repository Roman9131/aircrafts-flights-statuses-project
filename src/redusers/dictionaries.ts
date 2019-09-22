import { Reducer } from 'redux';

import * as types from '../constants';
import { IDataModel } from '../@types';

export interface IDictionariesState {
  airportsDict: Dictionary;
  airlinesDict: Dictionary;
  aircraftsDict: Dictionary;
}

export interface Dictionary {
  [s: string]: string;
}

const defaultState: IDictionariesState = {
  airportsDict: {},
  airlinesDict: {},
  aircraftsDict: {},
};

function setAirportsDict(list: IDataModel) {
  const dict: Dictionary = {};
  const { airports } = list.appendix;
  for (const airport in airports) {
    const airportCodeIata = airports[airport].iata;
    dict[airportCodeIata] = airports[airport].city;
  }
  return dict;
}

function setAirlinesDict(list: IDataModel) {
  const dict: Dictionary = {};
  const { airlines } = list.appendix;
  for (const airline in airlines) {
    const airlineFsCode = airlines[airline].fs;
    dict[airlineFsCode] = airlines[airline].name;
  }
  return dict;
}

function setAircraftDict(list: IDataModel) {
  const dict: Dictionary = {};
  const aircrafts = list.appendix.equipments;
  for (const aircraft in aircrafts) {
    const aircraftIataCode = aircrafts[aircraft].iata;
    dict[aircraftIataCode] = aircrafts[aircraft].name;
  }
  return dict;
}

export const dictionaries: Reducer<IDictionariesState> = (state = defaultState, action) => {
  switch (action.type) {
    case types.SET_DICTIONARIES:
      return {
        ...state,
        airportsDict: setAirportsDict(action.data),
        airlinesDict: setAirlinesDict(action.data),
        aircraftsDict: setAircraftDict(action.data),
      };
    default:
      return state;
  }
};
