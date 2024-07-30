
const execute = async (email) => { 
 try {
  if(email?.text?.includes("script")) { 
    throw new Error("Email contains script");
   }
  } 
  catch (e) { 
   throw e;  
 }
}


module.exports = {execute};