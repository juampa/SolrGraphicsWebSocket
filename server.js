var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')
  , sys = require('sys');

var iostat = require('child_process').spawn("iostat", ["-w 5"]);

app.listen(8000);

var datos = new Array(10) ;
var puntero = 0 ;
var size = 10 ;


function format (data) {
  var output_data = data.toString();
  sys.log(output_data);
  header = 'disk0       cpu     load average'
  if (output_data.match(header)) {
    sys.log("ignore header")
  }else{
    // disk0 cpu load 
    // average kbt tps kbs us sy id 1m 5m 15m
    var output_array = output_data.replace(/^\s+|\s+$/g,"").split(/\s+/);
    for (var i=0; i < output_array.length; i++) {
      output_array[i] = parseFloat( output_array[i]);
    };
    output_hash = {
      date:new Date(),
      disk:{
        kbt:output_array[0],
        tps:output_array[1],
        mbs:output_array[2]
      },
      cpu:{
        us:output_array[3],
        sy:output_array[4],
        id:output_array[5]
      },
      load_average:{
        m1:output_array[6],
        m5:output_array[7],
        m15:output_array[8]
      }
    }
    return JSON.stringify(output_hash);
  }
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
    sys.log(typeof(data));
    sys.log('server stdout: ' + format(data));
  	socket.emit('news',  format(data));
    //socket.on('my other event', function (data) {
    	//console.log(data);
  });
});

