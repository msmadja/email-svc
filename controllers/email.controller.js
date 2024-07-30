const emailService = require('../services/email/email.service');


const errorStatusMapper = { 
 "Email contains script": 400
}

const getEmails = async (req, res) => { 
   const { query } = req.query || {};
   const emails =  await emailService.get(query);
   res.send(emails);
 }

const sendEmail = async (req, res) => { 

 const {from, to, subject, text} = req.body;
  try {
    const created = await emailService.send({from, to, subject, text});
    res.send(created);
  }
  catch (e) { 
    const status = errorStatusMapper[e?.message] || 500;
    const message = e?.message;
    if(message) { 
        const timestamp = new Date().toISOString();
        console.log(`[${timestamp}] ${message}`);
    }
    res.status(status).send({message: status !== 500 ? message : 'Unhandled error'});
  }
}


module.exports = { sendEmail, getEmails };