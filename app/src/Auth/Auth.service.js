import apiGateway from '../Shared/ApiGateway';

class AuthService { 

 async authenticate({email, password}) {
   const authorization = await apiGateway.post('/auth/login', {email, password});
   localStorage.setItem('token', authorization?.token);
 }

}

const authService = new AuthService();
export default authService;