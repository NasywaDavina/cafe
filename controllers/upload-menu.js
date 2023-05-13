// load library multer
const { request } = require("express");
const { func } = require("joi");
const multer = require(`multer`);

// config of storage
const configStorage = multer.diskStorage({
  destination: (request, file, callback) => {
    callback(null, `./menu_image`);
  },
  filename: (request, file, callback) => {
    // icun.jpg
    // format: image-tgl-icun.jpg
    callback(null, `image-${Date.now()}-${file.originalname}`);
  },
});

// define function upload
const upload = multer({

  storage: configStorage,
  
  // file filter
  
  fileFilter: (request, file, callback) => {
    
    // define accepted extension
    const extension = (`image/jpg`, `Image/png`, `image/jpeg`);

    // check the extension
    if (!extension.includes(file.mimetype)) {
      // refuse upload
      callback(null, false);
      return callback(null, `Invalid type of file`);
    }

    // filter size limit
    // define max size
    const maxSize = 1 * 1024 * 1024;
    const fileSize = request.headers[`content-length`];

    if (fileSize > maxSize) {
      //   refuse uplaod
      callback(null, false);
      return callback(null, `File size is over`);
    }
    //   accepted upload
    callback(null, true);
  },
});

// export func
module.exports = upload;
