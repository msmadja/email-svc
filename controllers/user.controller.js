const userService = require('../services/user.service');

const me = async (req, res) => { 
  const userId = req?.userId;
  const user =  await userService.getOne({_id: userId});
  res.status(200).send(user);
}

module.exports = {me};