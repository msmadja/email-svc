import emailModel from './Email.model';
import apiGateway from '../Shared/ApiGateway';

class EmailService { 
  
 get sentEmails$() { 
    return emailModel.sentEmails;
 }

 async load() { 
    const sentEmails = await apiGateway.get('/email');
    emailModel.setSentEmails(sentEmails)
 }

 async sendEmail(email) {
   const sentEmail = await apiGateway.post('/email/send', email);
   emailModel.addSentEmail(sentEmail);
 }

}

const emailService = new EmailService();
export default emailService;