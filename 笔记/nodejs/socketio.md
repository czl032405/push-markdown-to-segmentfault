# scoket.io笔记
## socket.io

### server
```javascript
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
```


### client
```javascript
<script src="/socket.io/socket.io.js"></script>
<script src="http://code.jquery.com/jquery-1.11.1.js"></script>
<script>
  var socket = io();
  $('form').submit(function(){
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  });
</script>
```

### 404
make sure **require('socket.io')(server);** and  **server.listen();**

### Using multiple nodes
If you plan to distribute the load of connections among different processes or machines, you have to make sure that requests associated with a particular session id connect to the process that originated them.

????

## run on express
- [demo](http://www.tuicool.com/articles/fmeQVjZ)

## express-session


>[参考资料]
http://socket.io/
http://socket.io/docs/
https://github.com/socketio/socket.io
