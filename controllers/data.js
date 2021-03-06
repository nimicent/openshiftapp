const start = new Date();

exports.time = (req, res, next) => {
    req.someData = {time: Date().toString(), startedAt: start, startedAtFormatted: start.toLocaleDateString('en-US', {
    	month: 'long',
    	year: 'numeric',
    	day: 'numeric',
    	hour: '2-digit',
    	minute: '2-digit',
    	second: 'numeric',
    	timeZone: 'UTC', 
    	timeZoneName: 'short'
    }) }
    next();
};

exports.status = (req, res, next) => {
	req.someData.status = `200 OK. Request for status of request took: ${(new Date() - req.someData.startedAt)} ms`;
	next();
};

exports.to = (req, res, next) => {
	req.someData.to = `London. Request for location its being sent to took: ${(new Date() - req.someData.startedAt)} ms`;
	next();
};

exports.from = (req, res, next) => {
	req.someData.from = `Tokyo. Request for location its being sent from took: ${(new Date() - req.someData.startedAt)} ms`;
	next();
};

exports.headers = (req, res) => {
	res.json(req.someData);
};

// {
//     "time": "Mon Jul 12 2021 14:43:16 GMT-0500 (Central Daylight Time)",
//     "startedAt": "2021-07-12T19:43:13.848Z",
//     "startedAtFormatted": "July 12, 2021, 07:43:13 PM UTC",
//     "status": "200 OK. Request for status of request took: 2613 ms",
//     "to": "London. Request for location its being sent to took: 2613 ms",
//     "from": "Tokyo. Request for location its being sent from took: 2613 ms"
// }