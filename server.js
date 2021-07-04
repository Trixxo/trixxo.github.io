const http = require('http');
const fs = require('fs');
const path = require('path');

const host = 'localhost';
const port = 8000;
let staticBasePath = './';


const staticServe = function(req, res) {
	let absPath = path.resolve(staticBasePath);
	let safeSuffix = path.normalize(req.url).replace(/^(\.\.[\/\\])+/, '');

	if (safeSuffix == '/') {
		safeSuffix = 'index.html'
	}

	let fileLoc = path.join(absPath, safeSuffix);
	fs.readFile(fileLoc, function(err, data) {
		if (err) {
			res.writeHead(404);
			res.end(JSON.stringify(err));
			return res.end();
		}
		if (safeSuffix.includes("src")) {
			res.setHeader("Content-Type", "text/javascript");
		}
		if (safeSuffix.includes("frag")) {
			res.setHeader("Content-Type", "text/plain");
		}
		res.writeHead(200);
		res.write(data);
		return res.end();
	});
}

const listenCallback = function () {
    console.log(`Server is running on http://${host}:${port}`);
}

const server = http.createServer(staticServe);
server.listen(port, host, listenCallback);

