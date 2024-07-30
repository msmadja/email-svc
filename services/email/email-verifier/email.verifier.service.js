const plugins = require('./plugins');

const verify = async (email) => { 
  try {
    const promises = plugins.map(async p => p.execute(email));
    await Promise.all(promises);
  }
  catch (e) {
   throw e;
  }
}


module.exports = {verify};