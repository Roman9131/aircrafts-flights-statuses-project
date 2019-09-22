import React from 'react';

import './styles.sass';
import { FlightStatuses } from "../../@types";
import { IDictionariesState } from "../../redusers/dictionaries";

interface IFlightListProps {
  item: FlightStatuses;
  dictionaries: IDictionariesState;
  type: string;
}


export default class FlightListRow extends React.PureComponent<IFlightListProps> {
  render() {
    const {
      props: {
        item: {
          flightNumber, status, carrierFsCode, departureDate, arrivalAirportFsCode, codeshares, flightEquipment, departureAirportFsCode
        },
        dictionaries,
        type,
      },
    } = this;

    const time = new Date(departureDate.dateUtc);
    const tempMinutes = time.getMinutes();
    const minutes = (tempMinutes < 10) ? `0${tempMinutes}` : tempMinutes;
    const hour = time.getHours();
    const departureTimeUtc: any = `${hour}:${minutes}`;

    const destinationCityCode: string = type === "arrivals" ? departureAirportFsCode : arrivalAirportFsCode ;
    const fsCode: string = codeshares && codeshares.length ? codeshares[0].fsCode : '';
    const city: string | undefined = dictionaries.airportsDict[destinationCityCode];
    const airline: string | undefined = dictionaries.airlinesDict[fsCode];
    const aircraft: string | undefined = dictionaries.aircraftsDict[flightEquipment.actualEquipmentIataCode];

    return (
      <div className="flight-row">
          <div className="flight-row__time">
            <span>{ departureTimeUtc}  </span>
          </div>
          <div className="flight-row__number">
            <span>{carrierFsCode}{flightNumber}</span>
          </div>
          <div className="flight-row__destination-city">
            { city && arrivalAirportFsCode?
              <span>{ city } ({ arrivalAirportFsCode})</span>
              : "No informations"
            }
          </div>
          <div className="flight-row__airline-name">
            <span>{airline ? airline : "-"}</span>
          </div>
          <div className="flight-row__aircraft-name">
            <span>{aircraft ? aircraft : "-"}</span>
          </div>
          <div className="flight-row__status">
            <span>{status}</span>
          </div>
      </div>
    );
  }
}

