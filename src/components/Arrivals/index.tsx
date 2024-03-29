import * as React from 'react';
import Header from '../../components/Header';
import Search from '../../components/Search';
import loader from '../../images/loader.gif';
import FlightListRow from '../../components/FlightListRow';
import { FlightStatuses } from '../../@types';
import { IArrivalsContainerProps } from '../../containers/ArrivalsContainer';
import './styles.scss';

interface State {
  searchTerm: string;
  showDelayedFlights: boolean;
}

interface IArrivalsProps extends IArrivalsContainerProps {}

export default class Arrivals extends React.Component<IArrivalsProps, State> {
  static dislayName: string = 'arrivals';

  constructor(props: IArrivalsProps) {
    super(props);
    this.state = {
      searchTerm: '',
      showDelayedFlights: false,
    };
  }

  componentDidMount(): void {
    const { asyncGetArrivalsList } = this.props;
    asyncGetArrivalsList();
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
        flightArrivalsList, error, isLoading, dictionaries,
      },
      state: {
        searchTerm, showDelayedFlights,
      },
      onSearchChange,
    } = this;

    const flightListFlltred: FlightStatuses[] = searchTerm || showDelayedFlights
      ? flightArrivalsList.filter((item) => {
        if (showDelayedFlights) {
          const { delays } = item;
          const delayMinutes: number | undefined = delays && delays.arrivalGateDelayMinutes
            ? delays.arrivalGateDelayMinutes : undefined;
          return delayMinutes ? delayMinutes > 0 : false;
        }
        return true;
      }).filter((item) => {
        const flightSrting: string = `${item.carrierFsCode}${item.flightNumber}`;
        return flightSrting.toLocaleLowerCase().indexOf(searchTerm.toLocaleLowerCase()) !== -1;
      }) : flightArrivalsList;

    return (
      <div className="page">
        <div className="page-wrapper">
          <Header />
          <div className="content">
            <div className="content-wrapper">
              <h2 className="content__title"> Arrivals </h2>
              {flightArrivalsList.length
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
                        <div className="table-header__destination-city">From</div>
                        <div className="table-header__airline-name">AIRLINE</div>
                        <div className="table-header__aircraft-name">AIRCRAFT</div>
                        <div className="table-header__status">STATUS</div>
                      </div>
                      <div className="table-body">
                        {flightListFlltred.map((item) => (
                          <FlightListRow
                            key={item.flightId}
                            dictionaries={dictionaries}
                            type={Arrivals.dislayName}
                            item={item}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )
                : !isLoading && !error
                && <div className="text-container"><span>Arrival flights list is empty</span></div>}
              {flightArrivalsList.length > 0 && !flightListFlltred.length
              && (
                <div className="text-container">
                  <span className="warning-text">Arrival flights is not found</span>
                </div>
              )}
              {isLoading && <div><img alt="loader" src={loader} /></div>}
              {error && (
                <div className="text-container">
                  <span className="error-text">Error of download arrival flights list</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
