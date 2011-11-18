var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')
  , sys = require('sys');

var iostat = require('child_process').spawn("tail", ["-f", "-n 1", "/tmp/pruebas"]);

app.listen(8000);

function format (data) {
  var output_data = data.toString('utf8');
  //sys.log(output_data);
  output_hash = {
      date:new Date(),
      value:output_data
  }
  return JSON.stringify(output_hash);
}

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  	function (err, data) {
    	if (err) {
      	res.writeHead(500);
      	return res.end('Error loading index.html');
    }
	res.writeHead(200);
    res.end(data);
  });
}

io.sockets.on('connection', function (socket) {
  console.log('nueva conexion') ;
  iostat.stdout.on('data', function (data) {
    sys.log(data.toString('utf8'));
    //sys.log('server stdout: ' + format(data));
  	socket.emit('news',  format(data));
    //socket.on('my other event', function (data) {
    	//console.log(data);
  });
});

