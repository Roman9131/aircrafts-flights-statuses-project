import { IDepartureFlight } from './departures';

export interface IDataModel extends IDepartureFlight {
  request: Request;
  appendix: Appendix;
}

interface Request {
  airport: Airport;
  date: Date;
  hourOfDay: HourOfDay;
  numHours: NumHours;
  utc: Utc;
  codeType: any,
  maxFlights: any,
  extendedOptions: any,
  url: string;
}


interface Airport {
  requestedCode: string;
  fsCode: string;
}

interface Appendix {
  airlines: Airlines[];
  airports: Airports[];
  equipments: Equipments[];
}

interface Airlines {
  fs: string;
  iata: string;
  icao: string;
  name: string;
  phoneNumber: string;
  active: boolean
}

interface Airports {
  fs: string;
  iata: string;
  icao: string;
  name: string;
  street1: string;
  city: string;
  cityCode: string;
  countryCode: string;
  countryName: string;
  regionName: string;
  timeZoneRegionName: string;
  localTime: string;
  utcOffsetHours: number;
  latitude: number;
  longitude: number;
  elevationFeet: number;
  classification: number;
  active: boolean
  delayIndexUrl: string;
  weatherUrl: string;
}

interface Equipments {
  iata: string;
  name: string;
  turboProp: boolean;
  jet: boolean;
  widebody: boolean;
  regional: boolean;
}

interface Date {
  year: string;
  month: string;
  day: string;
  interpreted: string;
}

interface HourOfDay {
  requested: string;
  interpreted: number;
}

interface NumHours {
  requested: string;
  interpreted: number;
}

interface Utc {
  requested: boolean;
  interpreted: boolean;
}
