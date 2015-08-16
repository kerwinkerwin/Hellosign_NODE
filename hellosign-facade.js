var dotenv = require('dotenv')
var baseUri = "https://api.hellosign.com/v3"
var auth = {api_key:process.env.HELLOSIGN_KEY}
var unirest = require('unirest')
var headers ={
    'Accept':'application/json',
    'Content-Type':'application/json'
  };

dotenv.load()



var getTemplateList = function getTemplateList(callback){
  console.log("why?");
  unirest.get(baseUri + '/template/list')
    .auth(auth)
    .header(headers)
    .end(function(response){
      console.log(response);
    })
};

module.exports ={
  getTemplateList:getTemplateList
};
