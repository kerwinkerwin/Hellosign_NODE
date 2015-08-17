var dotenv = require('dotenv')
dotenv.load()
var unirest = require('unirest')
var baseUri = "https://api.hellosign.com/v3"
var auth = {
    user:process.env.HELLOSIGN_KEY,
    pass:"",
    sendImmediately:true
    }

var headers ={
    'Accept':'application/json',
    'Content-Type':'application/json'
  };

var getTemplateList = function getTemplateList(callback){
  console.log("why?");
  unirest.get(baseUri + '/template/list')
    .auth(auth)
    .header(headers)
    .end(function(response){
      callback(response);
    })
};

module.exports ={
  getTemplateList:getTemplateList
};
