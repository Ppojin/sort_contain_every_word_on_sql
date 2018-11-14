var nodeStatic = require('node-static');
var http = require('http');
var path = require('path');
var url = require('url');
var qs = require('querystring');

var home = path.join(__dirname, '..', '..');
var file = new nodeStatic.Server(home);
var server = http.createServer(function (req, res) {
	var parseUrl = url.parse(req.url);
	var pathname = parseUrl.pathname;
	switch(pathname){
		case '/time':
			responseTime(req, res);
			break;
		case '/timejson':
			responseTimeJson(req, res);
			break;
		default:
			file.serve(req, res);
	}
}).listen(9000, function(){
	console.log('http://localhost');
});