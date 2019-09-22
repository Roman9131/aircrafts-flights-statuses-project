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
import { asyncGetArrivalsList, IAsyncGetArrivalsList } from '../../actions';
import { IDictionariesState } from '../../redusers/dictionaries';

interface State {
  searchTerm: string;
}

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

class Arrivals extends React.Component<IMappedProps & IDispatchedProps> {
  static dislayName: string = 'arrivals';
  state: State = {
    searchTerm: '',
  };

  componentDidMount(): void {
    const { asyncGetArrivalsList: getList } = this.props;
    if (getList) {
      getList();
    }
  }

  private onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: e.target.value });
  };

  render() {
    const {
      props: {
        flightArrivalsList, error, isLoading, dictionaries,
      },
      state: {
        searchTerm,
      },
      onSearchChange,
    } = this;

    const flightListFlltredByNumber: FlightStatuses[] = searchTerm
      ? flightArrivalsList.filter((item) => {
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
                        {flightListFlltredByNumber.map((item) => (
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
              {flightArrivalsList.length > 0 && !flightListFlltredByNumber.length
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

export default connect(mapStateToProps, mapDispatchToProps)(Arrivals);
