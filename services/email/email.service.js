const nodemailer = require("nodemailer");
const {verify} = require('./email-verifier/email.verifier.service');
const {emailModel} = require('../../models');
const { query } = require("express");

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
      user: process.env.EMAIL_AUTH_USER,
      pass: process.env.EMAIL_AUTH_PASS,
    },
});

const send = async ({from, to, subject, text})=> { 
  const mailOptions = {
      from, to, subject, text
  };

  try {
    await verify({from, to, subject, text});
    return new Promise((resolve, reject) => { 
      transporter.sendMail(mailOptions, async (error, info) => {
        if (error) {
          reject(error);
        } else {
          const created = await  emailModel.create({from, to, subject, text, timestamp: new Date() })
          resolve(created);
        }
      })
    });
  } 
  catch (e) { 
    throw e;
  }
}

const get = (query = {}) => { 
  return emailModel.find(query);
}


module.exports = {send, get};