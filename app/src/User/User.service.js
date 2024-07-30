import apiGateway from '../Shared/ApiGateway';
import userModel from './User.model';

class UserService { 

 get onlineUser$() {
   return userModel.onlineUser;
 }

 async load() { 
  const user = await apiGateway.get('/user/me');
  this.setUser(user);
 }

 setUser(user) { 
   userModel.setUser(user);
 }

}

const authService = new UserService();
export default authService;