const {userModel} = require('../models');

const get = async (query = {}) => { 
  return await userModel.find(query);
}

const getOne = async (query = {}) => { 
    return await userModel.findOne(query);
}
  
const create = async (user) => { 
   const createdUser =  await userModel.create(user);
   return createdUser;
}


module.exports = {get, create, getOne};