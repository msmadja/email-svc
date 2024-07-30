import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import emailService from './Email.service';
import userService from '../User/User.service';
import useLocalStorage from "../Shared/Hooks/UseLocalStorage";



const SendEmail = observer(() => { 

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({ email: '', message: '' });
    const [value, setValue] = useLocalStorage('abc', {name: "888"})
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      // Basic validation
      const newErrors = { email: '', message: '' };
      if (!email) newErrors.email = 'Email is required.';
      if (!message) newErrors.message = 'Message is required.';
  
      if (newErrors.email || newErrors.message) {
        setErrors(newErrors);
        return;
      }
  
      await emailService.sendEmail({text: message, to: email, from: "John Doe", subject: "New Email"});
      setEmail('');
      setMessage('');
      setErrors({ email: '', message: '' });
    };
  
    const inputStyle = {
      margin: '10px 0',
      padding: '8px',
      fontSize: '16px',
      borderRadius: '4px',
      border: '1px solid #ccc',
      width: '100%',
      boxSizing: 'border-box',
    };
  
    const buttonStyle = {
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      padding: '10px 20px',
      fontSize: '16px',
      borderRadius: '4px',
      cursor: 'pointer',
      marginTop: '10px',
    };
  
    const containerStyle = {
      maxWidth: '400px',
      margin: '0 auto',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#f9f9f9',
    };
  
    const errorStyle = {
      color: 'red',
      fontSize: '12px',
      margin: '5px 0',
    };

    useEffect(() => { 
         emailService.load();
         userService.load();
    },[])

  return (
    <>
   <div style={containerStyle}>
      <b>Email:</b> {userService.onlineUser$.email}
      <div onClick={() => setValue({name: Date.now() })}>Name: {value.name}</div>
      <h3>New Email</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />
          {errors.email && <div style={errorStyle}>{errors.email}</div>}
        </div>
        <div>
          <textarea
            placeholder="Your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{ ...inputStyle, height: '100px' }}
          />
          {errors.message && <div style={errorStyle}>{errors.message}</div>}
        </div>
        <button type="submit" style={buttonStyle}>
          Send
        </button>
      </form>
    </div>

   <div style={containerStyle}>
   <h3>Emails</h3>
   {emailService.sentEmails$.map((v, i) => (
   <div key={i} style={{borderStyle: "double"}}>
    <div>Subject: {v.subject}</div>
    <div>Text: {v.text}</div>
    <div>Date: {v.timestamp}</div>
    <div>To: {v.to}</div>
    <div>From: {v.from}</div>
   </div>
   )
   )}
    </div>
    </>
  )
})

export default SendEmail;