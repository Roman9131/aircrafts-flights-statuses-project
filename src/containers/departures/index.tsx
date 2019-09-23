import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import './styles.sass';
import Header from '../../components/Header';
import Search from '../../components/Search';
import loader from '../../images/loader.gif';
import { IStore } from '../../redusers';
import FlightListRow from '../../components/FlightListRow';
import { FlightStatuses } from '../../@types';
import { asyncGetDeparturesList, IAsyncGetDeparturesList } from '../../actions';
import { IDictionariesState } from '../../redusers/dictionaries';

interface State {
  searchTerm: string;
  showDelayedFlights: boolean;
}

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

class Departures extends React.Component<IMappedProps & IDispatchedProps, State> {
  static dislayName: string = 'departures';

  constructor(props: IMappedProps & IDispatchedProps) {
    super(props);
    this.state = {
      searchTerm: '',
      showDelayedFlights: false,
    };
  }

  componentDidMount(): void {
    const { asyncGetDeparturesList: getList } = this.props;
    getList();
  }

  private onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: e.target.value });
  };

  private handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ showDelayedFlights: e.target.checked });
  };

  render() {
    const {
      props: {
        flightDeparturesList, error, isLoading, dictionaries,
      },
      state: {
        searchTerm, showDelayedFlights,
      },
      onSearchChange,
    } = this;

    const flightListFlltredByNumber: FlightStatuses[] = searchTerm || showDelayedFlights
      ? flightDeparturesList.filter((item) => {
        if (showDelayedFlights) {
          const { delays } = item;
          const delayMinutes: number | undefined = delays && delays.departureGateDelayMinutes
            ? delays.departureGateDelayMinutes : undefined;
          return delayMinutes ? delayMinutes > 0 : false;
        }
        return true;
      }).filter((item) => {
        const flightSrting: string = `${item.carrierFsCode}${item.flightNumber}`;
        return flightSrting.toLocaleLowerCase().indexOf(searchTerm.toLocaleLowerCase()) !== -1;
      }) : flightDeparturesList;

    return (
      <div className="page">
        <div className="page-wrapper">
          <Header />
          <div className="content">
            <div className="content-wrapper">
              <h2 className="content__title"> Departures </h2>
              {flightDeparturesList.length
                ? (
                  <div>
                    <Search placeholder="Search by flight" value={searchTerm} onChange={onSearchChange} />
                    <div className="content__checkbox">
                      <label>
                        <input
                          name="ischecked"
                          type="checkbox"
                          checked={showDelayedFlights}
                          onChange={this.handleInputChange}
                        />
                        Показывать только задержанные рейсы.
                      </label>
                    </div>
                    <div className="content__table">
                      <div className="table-header">
                        <div className="table-header__time">TIME</div>
                        <div className="table-header__number">FLIGHT</div>
                        <div className="table-header__destination-city">TO</div>
                        <div className="table-header__airline-name">AIRLINE</div>
                        <div className="table-header__aircraft-name">AIRCRAFT</div>
                        <div className="table-header__status">STATUS</div>
                      </div>
                      <div className="table-body">
                        {flightListFlltredByNumber.map((item) => (
                          <FlightListRow
                            key={item.flightId}
                            dictionaries={dictionaries}
                            type={Departures.dislayName}
                            item={item}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )
                : !isLoading && !error
                && <div className="text-container"><span>Departure flight list is empty</span></div>}
              {flightDeparturesList.length > 0 && !flightListFlltredByNumber.length
              && (
                <div className="text-container">
                  <span className="warning-text">Departure flight is not found</span>
                </div>
              )}
              {isLoading && <div><img alt="loader" src={loader} /></div>}
              {error
              && (
                <div className="text-container">
                  <span className="error-text">Error of download departure flight list</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Departures);
