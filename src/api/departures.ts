import axios from "axios";

import {IDataModel} from "../@types";

const API_SERVER_URL: string = "https://api.flightstats.com/flex/flightstatus/rest/v2/json/airport/status/SVO/dep/2022/2/23/9?appId=e56c2924&appKey=9c17a231f6dd354c45d32a971ff742f5&utc=true&numHours=6&maxFlights=40";

const axiosGetDeparturesList = () => axios.get<IDataModel>(API_SERVER_URL, {
    headers: {"Access-Control-Allow-Origin": "*", "Accept": "application/json", "Access-Control-Allow-Methods" : "GET,POST,PUT,DELETE,OPTIONS", "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"},
    responseType: "json",
});

export default axiosGetDeparturesList;
