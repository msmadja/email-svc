import { observable, makeObservable, action } from "mobx"

class User { 
  onlineUser = {};
  
  constructor() { 
    makeObservable(this, {
        onlineUser: observable,
        setUser: action

    })
  }
   
  setUser(user) { 
    this.onlineUser = user;
  }

}

const userModel = new User();
export default userModel;