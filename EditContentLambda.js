var AWS = require("aws-sdk");
var moment = require('moment');
var s3 = new AWS.S3();

var bucket = 'poland.fsecure.rutuja.dhore';
var key = 'doc.json';

exports.handler = function(event, context, callback) {
  return process(event, context, callback);
}

var process = function(input, context, callback) {
  var params = {
    Bucket: bucket,
    Key: key
  }
  s3.getObject(params, function(err, data) {
    if (err) {
      callback(err);
    } else {
      var fileContent = JSON.parse(data.Body.toString());
      var key = input.key;
      var value = input.value;
      if (inputValidated(key, value, fileContent, callback)) {
        fileContent[input.key] = input.value;
        fileContent.last_edit_time = moment().valueOf();
        writeToS3(fileContent, callback);
      }
    }
  });
}

var inputValidated = function(key, value, fileContent, callback) {
  if (key === undefined) {
    callback("JSON key cannot be NULL!");
    return false;
  }
  if (key.length === 0) {
    callback("JSON key cannot be Empty!");
    return false;
  }
  if (value === undefined) {
    callback("JSON value cannot be NULL!");
    return false;
  }
  if (!(key in fileContent)) {
    if (key === "last_edit_time" || key === "created_time") {
      callback("Cannot update this JSON feild!");
      return false;
    }
    callback("Invalid JSON key!");
    return false;
  }
  return true;
}

var writeToS3 = function(fileContent, callback) {
  var putParams = {
    Body: JSON.stringify(fileContent),
    Bucket: bucket,
    Key: key
  };

  s3.putObject(putParams, function(err, data) {
    if (err) callback(err);
    else {
      console.log(data);
      if (data !== undefined) {
        callback(null, "File updated on S3!!");
      }
    }
  });
}
