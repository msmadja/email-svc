import { observable, makeObservable, action } from "mobx"

class EmailModel { 
  sentEmails = [];
  
  constructor() { 
    makeObservable(this, {
        sentEmails: observable,
        setSentEmails: action,
        addSentEmail: action, 

    })
  }
  
  setSentEmails(sentEmails) { 
    this.sentEmails = sentEmails;
  }

  addSentEmail(sentEmail) { 
    this.sentEmails.push(sentEmail);
  }
}

const emailModel = new EmailModel();
export default emailModel;