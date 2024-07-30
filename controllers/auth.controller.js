const authService = require('../services/auth.service');

const register = async (req, res) => { 
  const { email, password } = req.body;
  try { 
     const user = await authService.register({email, password});
     res.status(201).send(user);
  }
  catch (e) { 
     res.status(400).send(e?.message);
  }
}


const login = async (req, res) => { 
  const { email, password } = req.body;
  try { 
   const token =  await authService.login({email, password});
   res.status(200).send({token});
  }
  catch (e) { 
    res.status(400).send(e?.message);
  }
}

module.exports = {register, login};