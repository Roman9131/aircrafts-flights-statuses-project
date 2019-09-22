const http = require('http');
const fs = require('fs');

const port = 3100;

let requestAmount = 0;

const requestHandler = (request, response) => {
	if (request.method === "GET") {
		requestAmount++;
		console.log(`${requestAmount}  || Request on: ${request.url}`);

		switch (request.url) {
			case "/arrivals":
				stubResponse(response, 'Arrivals_18_09_2019.json', requestAmount);
				break;
			case "/departures":
				stubResponse(response, 'Departures_18_09_2019.json', requestAmount);
				break;
			default:
				response.end(`Unknown URL requested: ${request.url}`);
		}
	} else {
		wrapCorsResponse(response).end(`Tech request resolved.`);
	}

};

const server = http.createServer(requestHandler);

server.listen(port, (err) => {
	if (err) {
		return console.log('Error: ', err);
	}

	console.log(`Server is running on port ${port}`);
});

stubResponse = (response, stubName, requestId) => {
	console.log(`${requestId}  || Response is: ${stubName}`);
	return setTimeout(() => {
		const firstStubResponse = JSON.parse(fs.readFileSync(stubName, 'utf8'));

		return wrapCorsResponse(response).end(JSON.stringify(firstStubResponse));
	}, 1000)

};

wrapCorsResponse = (response) => {
	response.setHeader('Access-Control-Allow-Origin', '*');
	response.setHeader('Access-Control-Allow-Headers', 'X-Request-With,content-type,X-rest-id');

	return response;
};
