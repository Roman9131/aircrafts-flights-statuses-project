import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { IStore } from '../redusers';
import { FlightStatuses } from '../@types';
import { asyncGetDeparturesList, IAsyncGetDeparturesList } from '../actions';
import { IDictionariesState } from '../redusers/dictionaries';
import Departures from  '../components/Departures';

interface IMappedProps {
  flightDeparturesList: FlightStatuses[];
  dictionaries: IDictionariesState;
  isLoading: boolean;
  error: boolean;
}

interface IDispatchedProps {
  asyncGetDeparturesList: IAsyncGetDeparturesList;
}

const mapStateToProps = (state: IStore): IMappedProps => (
  {
    flightDeparturesList: state.departureList.flightDeparturesList,
    dictionaries: state.dictionaries,
    isLoading: state.departureList.isLoading,
    error: state.departureList.error,
  }
);

const mapDispatchToProps = (dispatch: Dispatch): IDispatchedProps => (
  {
    asyncGetDeparturesList: () => dispatch(asyncGetDeparturesList()),
  }
);

export interface IDeparturesContainerProps extends IDispatchedProps, IMappedProps {}

const DeparturesContainer = (props: IDeparturesContainerProps) => <Departures {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(DeparturesContainer);
