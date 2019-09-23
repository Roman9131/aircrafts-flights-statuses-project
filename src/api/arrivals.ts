import axios from 'axios';

import { IDataModel } from '../@types';

// const API_SERVER_URL: string = 'http://localhost:3100/arrivals';

const API_SERVER_URL: string = '/flex/flightstatus/rest/v2/json/airport/status/SVO/arr/2019/9/23/9?appId=0b082666&appKey=6b6d118509069b9922834bdd0c7f7e88&utc=true&numHours=6&maxFlights=40';

const axiosGetArrivalsList = () => axios.get<IDataModel>(API_SERVER_URL);

export default axiosGetArrivalsList;
