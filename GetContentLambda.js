var AWS = require("aws-sdk");

var s3 = new AWS.S3();
var params = {
  Bucket: 'poland.fsecure.rutuja.dhore',
  Key: 'doc.json'
}

exports.handler = function(event, context, callback) {
  process(callback);
}

var process = function(callback) {
  s3.getObject(params, function(err, data) {
    if (err) {
      callback(err.stack);
    } else {
      callback(null, JSON.parse(data.Body.toString()));
    }
  });
}
