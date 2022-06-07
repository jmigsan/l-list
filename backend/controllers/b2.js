const AWS = require('aws-sdk');
const S3 = require('aws-sdk/clients/s3');
const fs = require ('fs');

const bucketName = process.env.BB_BUCKET_NAME;
const accessKeyId = process.env.BB_ACCESS_KEY;
const secretAccessKey = process.env.BB_SECRET_KEY;

const ep = new AWS.Endpoint(process.env.BB_ENDPOINT);

const b2 = new S3({
  accessKeyId,
  secretAccessKey,
  endpoint: ep
});

const uploadFile = (file) => {
  const fileStream = fs.createReadStream(file.path);

  let fileExtension = '';

  if (file.mimetype === 'image/jpeg') {
    fileExtension = '.jpg';
  } else if (file.mimetype === 'image/png') {
    fileExtension = '.png';
  } else if (file.mimetype === 'image/gif') {
    fileExtension = '.gif';
  } else if (file.mimetype === 'video/mp4') {
    fileExtension = '.mp4';
  }

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: `${file.filename}${fileExtension}`,
  };

  return b2.upload(uploadParams).promise();
};

const getFileStream = (fileKey) => {
  const downloadParams = {
    Bucket: bucketName,
    Key: fileKey
  };

  return b2.getObject(downloadParams).createReadStream();
};

const deleteFile = (fileKey) => {
  const deleteParams = {
    Bucket: bucketName,
    Key: fileKey
  };

  return b2.deleteObject(deleteParams).promise();
};

exports.uploadFile = uploadFile;
exports.getFileStream = getFileStream;
exports.deleteFile = deleteFile;