const axios = require('axios');
const querystring = require('querystring');

const instanceUrl = "https://humanitixsync-dev-ed.lightning.force.com";
const username = "";
const password = '';
const clientSecret = '';
const clientId = ''

async function getAccessToken() {
    const  data = querystring.stringify({
        "grant_type": "password",
        "client_id": clientId,
        "client_secret": clientSecret,
        "username": username,
        "password": password
    });
    const config = {
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        }
    }
    const response = await axios.post(`https://login.salesforce.com/services/oauth2/token`, data, config);
    return response.data.access_token;
}


async function createEvent(token){
    const  data = { "HTix_id__c": "what7", "Name" : "MySecondEvent"}
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    }
    const response = await axios.post(`${instanceUrl}/services/data/v43.0/sobjects/HTix_Event__c`, data, config);
   
    return response.data
}



async function create(){
    try {
        const token = await getAccessToken();
        console.log('token', token)
        const result = await createEvent(token);
        console.log('result', result)
    } catch (err){
        console.log('error',err)
    }
}
create();



