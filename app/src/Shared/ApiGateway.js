import config from './Config';

class ApiGateway { 
  
 async get(path) { 
    const token = localStorage.getItem('token');
    const response = await fetch(`${config.API_BASE}${path}`, {method: 'GET', headers: {'Authorization': token}});
    const data = await response.json();
    if (!response.ok) {
       const e =  new Error(data.message || 'Currently, unable to fetch the data.')
       throw e;
    }
    return data;
 }

 async post(path, body) { 
   const token = localStorage.getItem('token');
   const response = await fetch(`${config.API_BASE}${path}`, {
    method: 'POST', 
    body: JSON.stringify(body),
    headers: {'Content-Type': "application/json", 'Authorization': token }
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Currently, unable to fetch the data.')
 }
  return data;
 }

 async put(path, body)  { 
   const token = localStorage.getItem('token');
   const response = await fetch(`${config.API_BASE}${path}`, {
     method: 'PUT',
     body: JSON.stringify(body) ,
     headers: {'Content-Type': "application/json", 'Authorization': token}
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Currently, unable to fetch the data.')
    }
    return data;
 }

 async delete(path) { 
   const token = localStorage.getItem('token');
   const response =  await fetch(`${config.API_BASE}${path}`, {
    method: 'DELETE',
    headers: {'Authorization': token}
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Currently, unable to fetch the data.')
  }
  return data;
 }
}

const apiGateway = new ApiGateway();
export default apiGateway;