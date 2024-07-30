const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const userService = require('./user.service');

const login = async ({email, password}) => { 
  const user = await userService.getOne({email});
   if(!user) { 
      const error = new Error("No user for this email");
      reject(error);
   }

   return new Promise((resolve, reject) => { 
    bcrypt.compare(password, user?.password, async (err, result) => {
        if(err) { 
            reject(err);
        } else { 
            if (!result) { 
                const error = new Error("The password is wrong");
                reject(error);
            } else { 
                const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
                resolve(token);
            }
        }
    });
  });
}

const register = async ({email, password}) => { 
  return new Promise((resolve, reject) => {
   bcrypt.genSalt(10, function(err, salt) {
     if(err) { 
        reject("Salt is failed to be generated");
     }
     bcrypt.hash(password, salt, async (err, hash) => {
       if(err) { 
         reject(err);
       } else { 
         const user = await userService.create({email, password: hash});
         resolve(user);
       }
    });
   });
  }); 
}

const verify = async (token) => { 
  return new Promise((resolve, reject) =>  {
   if (!token) {
     reject(new Error('No credentials sent!'));
   }

   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
     if(err) { 
       reject(new Error('token is invalid'));
     }
     resolve(decoded);
    });
  });
}


module.exports = {login, register, verify};