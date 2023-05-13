// load model of user
const userModel = require(`../models/index`).user;

// load joi library
const joi = require(`joi`);

const { request, response } = require("../routes/meja-route");

// load Op from sequelize library
const { Op, json } = require("sequelize");

// load md5 library
const md5 = require(`md5`);
const e = require("express");

// create a validation function
let validateUser = async (input) => {
  // make a rules of validation
  let rules = joi.object().keys({
    nama_user: joi.string().required(),
    role: joi.string().validate(`kasir`, `admin`, `manager`),
    username: joi.string().required(),
    password: joi.string().min(6),
  });

  // process validation
  let { error } = rules.validate(input);

  // check error validation
  if (error) {
    let message = error.details.map((item) => item.message).join(",");

    return {
      status: false,
      message: message,
    };
  }

  return {
    status: true,
  };
};

// create and export func to get all user
exports.getUser = async (request, response) => {
  try {
    // get all user using model
    let result = await userModel.findAll();

    // give response
    return response.json({
      status: true,
      data: result,
    });
  } catch (error) {
    return response.json({
      status: false,
      message: error.message,
    });
  }
};

// create and export func to find user
exports.findUser = async (request, response) => {
  try {
    // get the keyword of search
    let keyword = request.body.keyword;

    // get user based on keyword
    let result = await userModel.findAll({
      where: {
        [Op.or]: {
          nama_user: { [Op.substring]: keyword },
          role: { [Op.substring]: keyword },
          username: { [Op.substring]: keyword },
        },
      },
    });

    // give response
    return response.json({
      status: true,
      data: result,
    });
  } catch (error) {
    return response.json({
      status: false,
      message: error.message,
    });
  }
};

// create and export func to add user
exports.addUser = async (request, response) => {
  try {
    // validate a request
    let resultValidation = validateUser(request.body);
    if (resultValidation.status === false) {
      return response.json({
        status: false,
        message: resultValidation.message,
      });
    }

    // convert a password to md5 form
    request.body.password = md5(request.body.password);

    // execute insert user using model
    await userModel.create(request.body);

    // give response
    return response.json({
      status: true,
      message: `Data user berhasil ditambah`,
    });
  } catch (error) {
    return response.json({
      status: false,
      error: error.message,
    });
  }
};

// create and export func to update user
exports.updateUser = async (request, response) => {
  try {
    // get id user that will be update
    let id_user = request.params.id_user;

    // validate a request body
    let resultValidation = validateUser(request.body);

    // check result validation
    if (resultValidation.status === false) {
      return response.json({
        status: false,
        message: resultValidation.message,
      });
    }

    // convert password to md5 if it exist
    if (request.body.password) {
      request.body.password = md5(request.body.password);
    }

    //   execute update user using model
    await userModel.update(request.body, { where: { id_user: id_user } });

    //   give response
    return response.json({
      status: true,
      message: `Data user berhasil diubah`,
    });
      
  } catch (error) {
    return response.json({
      status: false,
      message: error.message,
    });
  }
};

// create and export func to delete user
exports.deleteUser = async (request, response) => {
    try {
        // get id_user that will be delete
        let id_user = request.params.id_user

        // execute   
        await userModel.destroy({
            where: { id_user: id_user }
        })

        // give a response
        return response.json({
            status: true,
            message: `Data user telah dihapus`
        })
    } catch (error) {
        return response.json({
            status: false,
            message: error.message
        })
    }
}
