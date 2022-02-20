import axios from 'axios';

import {IDataModel} from '../@types';

const API_SERVER_URL: string = 'https://api.flightstats.com/flex/flightstatus/rest/v2/json/airport/status/SVO/arr/2022/2/20/10?appId=e56c2924&appKey=9c17a231f6dd354c45d32a971ff742f5&utc=true&numHours=1&maxFlights=50';

const axiosGetArrivalsList = () => axios.get<IDataModel>(API_SERVER_URL, {
    headers: {"Access-Control-Allow-Origin": "*", "Accept": "application/json", "Access-Control-Allow-Methods" : "GET,POST,PUT,DELETE,OPTIONS", "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"},
    responseType: "json",
});

export default axiosGetArrivalsList;
