const start = new Date();

exports.time = (req, res, next) => {
    req.someData = {time: Date().toString(), startedAt: start, startedAtFormatted: start.toLocaleDateString('en-US', {
    	month: 'long',
    	year: 'numeric'
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



