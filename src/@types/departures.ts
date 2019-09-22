export interface IDepartureFlight {
  flightStatuses: FlightStatuses[];
}

export interface FlightStatuses {
  flightId: number;
  carrierFsCode: string;
  flightNumber: string;
  departureAirportFsCode: string;
  arrivalAirportFsCode: string;
  departureDate: DepartureDate;
  arrivalDate: ArrivalDate;
  status: string;
  schedule: Schedule;
  operationalTimes: OperationalTimes;
  delays?: Delays;
  codeshares?: Codeshares[];
  flightDurations: FlightDurations;
  airportResources: AirportResources;
  flightEquipment: FlightEquipment;
}

export interface DepartureDate {
  dateLocal: string;
  dateUtc: string;
}

export interface Codeshares {
  fsCode: string;
  flightNumber: string;
  relationship: string;
}


export interface ArrivalDate {
  dateLocal: string;
  dateUtc: string;
}

export interface Schedule {
  flightType: string;
  serviceClasses: string;
  restrictions: string;
}

export interface OperationalTimes {
  publishedDeparture: DateLocalVsUts;
  publishedArrival: DateLocalVsUts;
  scheduledGateDeparture: DateLocalVsUts;
  estimatedGateDeparture: DateLocalVsUts;
  actualGateDeparture: DateLocalVsUts;
  flightPlanPlannedDeparture: DateLocalVsUts;
  estimatedRunwayDeparture: DateLocalVsUts;
  actualRunwayDeparture: DateLocalVsUts;
  scheduledGateArrival: DateLocalVsUts;
  estimatedGateArrival: DateLocalVsUts;
  flightPlanPlannedArrival: DateLocalVsUts;
  estimatedRunwayArrival: DateLocalVsUts;
}

export interface DateLocalVsUts {
  dateLocal: string;
  dateUtc: string;
}

export interface Delays {
  arrivalRunwayDelayMinutes: number;
}

export interface FlightDurations {
  scheduledBlockMinutes: number;
  scheduledAirMinutes: number;
  scheduledTaxiOutMinutes: number;
  taxiOutMinutes: number;
  scheduledTaxiInMinutes: number;
}

export interface AirportResources {
  departureTerminal: string;
  arrivalTerminal: string;
  arrivalGate: string;
  baggage: string;
}

export interface FlightEquipment {
  scheduledEquipmentIataCode: string;
  actualEquipmentIataCode: string;
  tailNumber: string;
}

export interface Airlines {
  fs: string;
  iata: string;
  icao: string;
  name: string;
  phoneNumber: string;
  active: boolean
}
