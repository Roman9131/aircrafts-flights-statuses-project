import { Reducer } from 'redux';

import * as types from '../constants';
import { IDataModel } from "../@types";

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

export const dictionaries: Reducer<IDictionariesState> = (state = defaultState, action) => {
  switch (action.type) {
    case types.SET_DICTIONARIES:
      console.log(action.data)
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

function setAirportsDict(list: IDataModel) {
  const dict: Dictionary = {};
  const airports = list.appendix.airports;
  for (let airport in airports) {
    let airportCodeIata = airports[airport].iata;
    dict[airportCodeIata] = airports[airport].city;
  }
  return dict;
}

function setAirlinesDict(list: IDataModel) {
  const dict: Dictionary = {};
  const airlines = list.appendix.airlines;
  for (let airline in airlines) {
    let airlineFsCode = airlines[airline].fs;
    dict[airlineFsCode] = airlines[airline].name;
  }
  return dict;
}

function setAircraftDict(list: IDataModel) {
  const dict: Dictionary = {};
  const aircrafts = list.appendix.equipments;
  for (let aircraft in aircrafts) {
    let aircraftIataCode = aircrafts[aircraft].iata;
    dict[aircraftIataCode] = aircrafts[aircraft].name;
  }
  return dict;
}
