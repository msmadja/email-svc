const jwt = require('jsonwebtoken');
const authService = require('../services/auth.service');


const authMiddleware = async (req, res, next) => { 
  try { 
    const authorization = req.headers.authorization;
    const decoded = await authService.verify(authorization);

    req.userId = decoded._id;
    next();
    }
    catch (e) { 
       res.status(403).send({message: e?.message})
     }
}


module.exports = authMiddleware