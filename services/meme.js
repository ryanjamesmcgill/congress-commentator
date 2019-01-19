const fs = require('fs');
const path = require('path');
const async = require('async');
const imgur = require('imgur');
const memeLib = require('nodejs-meme-generator');

exports.createMeme = (topText, bottomText, cb) => {
  const memeGenerator = new memeLib({
    canvasOptions: { // optional
      canvasWidth: 1024,
      canvasHeight: 800
    },
    fontOptions: { // optional
      fontSize: 40,
      fontFamily: 'Helvetica',
      lineHeight: 2
    }
  });

  memeGenerator.generateMeme({
    topText: topText,
    bottomText: bottomText,
    url: 'https://imgur.com/8PE28SH.png'
    })
    // upload to imgur:
    .then((data) => {
      console.log('Meme created! Buffer data: ', data) 
      // make an empty array, push binary into array
      var fileContentArray = [];
      fileContentArray.push(data);
      // make a buffer from that with concat 
      var fileContent = new Buffer.concat(fileContentArray);
      // encode
      var imgToUpload = fileContent.toString('base64');
      // upload & generate link
      uploadBase64(imgToUpload);
    })
    .catch((err) => {
      console.log(err)
    });
  // return cb?
}
