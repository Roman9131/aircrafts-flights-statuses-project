import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { IStore } from '../redusers';
import { FlightStatuses } from '../@types';
import { asyncGetArrivalsList, IAsyncGetArrivalsList } from '../actions';
import { IDictionariesState } from '../redusers/dictionaries';
import Arrivals from '../components/Arrivals';

interface IMappedProps {
  flightArrivalsList: FlightStatuses[];
  dictionaries: IDictionariesState;
  isLoading: boolean;
  error: boolean;
}

interface IDispatchedProps {
  asyncGetArrivalsList: IAsyncGetArrivalsList;
}

const mapStateToProps = (state: IStore): IMappedProps => (
  {
    flightArrivalsList: state.arrivalsList.flightArrivalsList,
    dictionaries: state.dictionaries,
    isLoading: state.arrivalsList.isLoading,
    error: state.arrivalsList.error,
  }
);

const mapDispatchToProps = (dispatch: Dispatch): IDispatchedProps => (
  {
    asyncGetArrivalsList: () => dispatch(asyncGetArrivalsList()),
  }
);

export interface IArrivalsContainerProps extends IDispatchedProps, IMappedProps {}

const ArrivalsContainer = (props: IArrivalsContainerProps) => <Arrivals {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(ArrivalsContainer);
