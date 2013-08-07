var http = require('http');
var child_process = require('child_process');

var BASE = 'http://www.ietf.org/rfc/rfc'

function req(number, cb) {
  var url = BASE + number + '.txt';
  console.log('getting rfcCast:', url);

  http.get(url, function(res) {
    if (res.statusCode !== 200) return cb(new Error('not found'));

    console.log('suceess!');

    var data = [];
    res.on('data', function(d) {
      data.push(d);
    });

    res.on('end', function() {
      var body = data.join().toString('utf-8');

      var cp = child_process.spawn('say', [body]);
      cp.on('end', cb);
    });
  }).on('error', function(e) {
    console.log('an error occurred');
    process.exit();
  });
}

module.exports = req;
